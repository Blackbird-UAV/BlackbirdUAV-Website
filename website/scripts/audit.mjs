// CI audit gate. `npm run audit:ci` first runs `npm audit --omit=dev
// --audit-level=high`, which fails on any high or critical advisory in a
// production dependency with no allowlist at all. This script then audits the
// whole tree the same way, except for the advisories allowlisted below, so the
// allowlist can only ever excuse dev-only advisories. Every entry needs a
// reason; delete it as soon as a fix ships.
import { execSync } from 'node:child_process'

const ALLOWLIST = new Map([
  // No patched braces release exists. It only reaches us via eslint-config-next's
  // lint tooling (@next/eslint-plugin-next -> fast-glob -> micromatch -> braces),
  // which only ever expands globs from our own config. Dev-only, which the
  // production audit enforces: if braces reached a production dependency, that
  // audit would fail. Remove this once braces ships a fix or
  // @next/eslint-plugin-next drops fast-glob.
  ['GHSA-vfj7-8cjw-p6xm', 'braces has no fix; dev-only lint tooling fed our own globs']
])

const ci = Boolean(process.env.GITHUB_ACTIONS)
// Workflow command messages must escape %, CR and LF.
const escapeData = (msg) => msg.replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A')
const log = (level, msg) => console.log(ci ? `::${level}::${escapeData(String(msg))}` : `${level}: ${msg}`)
const fail = (msg) => {
  log('error', `audit:ci: ${msg}`)
  process.exit(1)
}

let stdout
try {
  stdout = execSync('npm audit --json', { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
} catch (err) {
  stdout = err.stdout // npm audit exits non-zero whenever it finds anything
}

let report
try {
  report = JSON.parse(stdout)
} catch {
  fail(`npm audit did not print JSON: ${String(stdout).slice(0, 300)}`)
}
// Anything but a version 2 report fails closed, including the {message,
// statusCode, error} npm prints when the registry fails. In a report, `via`
// lists advisory objects and the names of other vulnerable packages.
const isObject = (value) => typeof value === 'object' && value !== null && !Array.isArray(value)
const wellFormed = (vuln) =>
  isObject(vuln) && Array.isArray(vuln.via) && vuln.via.every((via) => typeof via === 'string' || isObject(via))
if (report?.auditReportVersion !== 2 || report.error !== undefined ||
  !isObject(report.vulnerabilities) || !Object.values(report.vulnerabilities).every(wellFormed)) {
  const status = report?.statusCode ? ` (HTTP ${report.statusCode})` : ''
  const detail = [report?.message, JSON.stringify(report?.error ?? report).slice(0, 300)].filter(Boolean)
  fail(`npm audit failed${status}: ${detail.join(' ')}`)
}
const { vulnerabilities } = report

const severe = (severity) => ['high', 'critical'].includes(String(severity).toLowerCase())
const idOf = (adv) => String(adv.url).split('/').pop()
const describe = (adv) => `${adv.severity} ${adv.name} ${adv.range} - ${adv.title} - ${adv.url}`
const advisories = Object.values(vulnerabilities).flatMap((vuln) => vuln.via.filter(isObject))
const notices = new Set()
const blocking = new Set()
const seen = new Set()

// 1. Any high or critical advisory blocks unless it is allowlisted.
for (const adv of advisories) {
  const id = idOf(adv)
  if (ALLOWLIST.has(id)) {
    seen.add(id)
    notices.add(`allowlisted: ${describe(adv)} (${ALLOWLIST.get(id)})`)
  } else if (severe(adv.severity)) {
    blocking.add(describe(adv))
  }
}

// 2. npm also rates each package by the worst advisory behind it, following
// `via` names, and --audit-level goes by that rating. A high or critical
// package blocks unless high or critical advisories are found behind it and
// all of them are allowlisted, so apart from the allowlist this gate is never
// more lenient than --audit-level=high. Low and moderate advisories behind it
// don't count, just as they don't for --audit-level=high.
const roots = (name, visited) => {
  if (visited.has(name) || !Object.hasOwn(vulnerabilities, name)) return []
  visited.add(name)
  return vulnerabilities[name].via.flatMap((via) => (typeof via === 'string' ? roots(via, visited) : [via]))
}
for (const [name, vuln] of Object.entries(vulnerabilities)) {
  if (!severe(vuln.severity)) continue
  const found = roots(name, new Set()).filter((adv) => severe(adv.severity))
  const unexcused = new Set(found.map(idOf).filter((id) => !ALLOWLIST.has(id)))
  if (!found.length || unexcused.size) {
    blocking.add(`${vuln.severity} ${name}, via ${found.length ? [...unexcused].join(', ') : 'no high or critical advisory'}`)
  }
}

notices.forEach((line) => log('notice', line))
for (const id of ALLOWLIST.keys()) {
  if (!seen.has(id)) log('warning', `${id} is no longer reported; remove it from the allowlist in scripts/audit.mjs`)
}
if (blocking.size) {
  blocking.forEach((line) => log('error', line))
  fail(`high or critical findings outside the allowlist: ${blocking.size}`)
}
const reported = new Set(advisories.map(idOf)).size
console.log(`audit:ci: OK, nothing high or critical outside the allowlist (advisories reported: ${reported})`)
