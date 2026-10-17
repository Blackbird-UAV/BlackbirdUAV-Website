// Writes each page's Lighthouse scores and key numbers as a Markdown table:
// to the run's summary page on GitHub ($GITHUB_STEP_SUMMARY), or to the
// terminal elsewhere. Every value is the median of the page's runs, as the
// budgets in lighthouserc.js are. It reads what `lhci collect` saved in
// .lighthouseci, and the report names from `lhci upload` in
// lighthouse-reports/.
//
// It runs even when collecting failed part way, so it never fails the job
// itself: the budgets step after it does that.
import fs from 'node:fs'
import path from 'node:path'

const WEBSITE = path.join(import.meta.dirname, '..')
const RESULTS = path.join(WEBSITE, '.lighthouseci')
const MANIFEST = path.join(WEBSITE, 'lighthouse-reports', 'manifest.json')
const ARTIFACT = 'lighthouse-reports' // the artifact's name in lighthouse.yml

const median = (values) => {
  const sorted = values.filter(Number.isFinite).sort((a, b) => a - b)
  if (!sorted.length) return NaN
  const mid = Math.floor(sorted.length / 2)
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2
}

const formats = {
  score: (value) => String(Math.round(value * 100)),
  ms: (value) => value >= 1000 ? `${(value / 1000).toFixed(1)} s` : `${Math.round(value)} ms`,
  cls: (value) => String(Number(value.toFixed(3))),
  kib: (value) => `${Math.round(value / 1024)} KiB`
}

const COLUMNS = [
  ['Performance', 'score', (lhr) => lhr.categories.performance?.score],
  ['Accessibility', 'score', (lhr) => lhr.categories.accessibility?.score],
  ['Best practices', 'score', (lhr) => lhr.categories['best-practices']?.score],
  ['SEO', 'score', (lhr) => lhr.categories.seo?.score],
  ['LCP', 'ms', (lhr) => lhr.audits['largest-contentful-paint']?.numericValue],
  ['TBT', 'ms', (lhr) => lhr.audits['total-blocking-time']?.numericValue],
  ['CLS', 'cls', (lhr) => lhr.audits['cumulative-layout-shift']?.numericValue],
  ['Page weight', 'kib', (lhr) => lhr.audits['total-byte-weight']?.numericValue]
]

// /vehicles.html -> /vehicles, the address the site itself uses.
const pageName = (url) => new URL(url).pathname.replace(/\.html$/, '').replace(/(^|\/)index$/, '$1') || '/'

function readJson (file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'))
  } catch {
    return undefined
  }
}

function loadRuns () {
  if (!fs.existsSync(RESULTS)) return []
  return fs.readdirSync(RESULTS)
    .filter((file) => /^lhr-\d+\.json$/.test(file))
    .map((file) => readJson(path.join(RESULTS, file)))
    .filter((lhr) => lhr?.requestedUrl && lhr.categories && lhr.audits)
}

// The report LHCI wrote for each page, from the run closest to the median.
function reportNames () {
  const names = new Map()
  const manifest = readJson(MANIFEST)
  for (const entry of Array.isArray(manifest) ? manifest : []) {
    if (entry?.isRepresentativeRun && entry.url && entry.htmlPath) {
      names.set(entry.url, path.basename(entry.htmlPath))
    }
  }
  return names
}

function table (runs) {
  const byUrl = Map.groupBy(runs, (lhr) => lhr.requestedUrl)
  const reports = reportNames()
  const lines = [
    `| Page | ${COLUMNS.map(([title]) => title).join(' | ')} | Report |`,
    `| --- | ${COLUMNS.map(() => '---:').join(' | ')} | --- |`
  ]
  const errors = []
  for (const [url, lhrs] of byUrl) {
    const cells = COLUMNS.map(([, format, get]) => {
      const value = median(lhrs.map(get))
      return Number.isNaN(value) ? 'n/a' : formats[format](value)
    })
    const report = reports.get(url)
    lines.push(`| ${pageName(url)} | ${cells.join(' | ')} | ${report ? `\`${report}\`` : ''} |`)
    for (const lhr of lhrs) {
      if (lhr.runtimeError) errors.push(`- ${pageName(url)}: ${lhr.runtimeError.code} ${lhr.runtimeError.message}`)
    }
  }
  const counts = [...new Set([...byUrl.values()].map((lhrs) => lhrs.length))]
  const runCount = `${counts.join(' or ')} run${counts.join() === '1' ? '' : 's'}`
  // e.g. "HeadlessChrome/141.0.0.0" in the user agent
  const chrome = runs[0].environment?.hostUserAgent?.match(/Chrome\/([\d.]+)/)?.[1]
  const versions = `Lighthouse ${runs[0].lighthouseVersion}${chrome ? `, Chrome ${chrome}` : ''}`
  return [
    `Median of ${runCount} per page (${versions}), on a simulated mid-range phone on slow 4G. Scores are out of ` +
      '100. LCP: Largest Contentful Paint; TBT: Total Blocking Time; CLS: Cumulative Layout ' +
      'Shift; page weight: what the page downloads as it loads, compressed. The check fails if ' +
      'a page goes over a budget in `website/lighthouserc.js`. Each page\'s full ' +
      'report, from its run closest to the median, is in ' +
      (process.env.GITHUB_ACTIONS ? `this run's \`${ARTIFACT}\` artifact.` : '`lighthouse-reports/`.'),
    '',
    ...lines,
    ...(errors.length ? ['', 'Lighthouse reported errors:', '', ...errors] : [])
  ].join('\n')
}

// Also printed on GitHub, so the job's log has the numbers too
function write (markdown) {
  const text = `## Lighthouse\n\n${markdown}\n`
  process.stdout.write(text)
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, text)
}

try {
  const runs = loadRuns()
  write(runs.length
    ? table(runs)
    : 'No Lighthouse results: no page was audited. The job log shows the step that failed.')
} catch (err) {
  // A bug here shouldn't fail the check or hide the budgets step's verdict.
  console.log(`::warning::Could not summarise the Lighthouse results: ${err.message}`)
}
