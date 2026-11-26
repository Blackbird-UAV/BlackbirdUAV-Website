// Fails when public/sitemap.xml and the exported site disagree. The sitemap
// is written by hand, so a new team season or page is easy to leave out.
// Also checks the lastmod dates the build adds to the published copy
// (scripts/date-sitemap.mjs). Run from website/ after a build:
// `npm run check:sitemap`. `npm test` and CI both run it.
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'

const SITE = 'https://blackbirduav.ca/'
// In GitHub Actions, errors become annotations, and a page with no date fails
const ci = Boolean(process.env.GITHUB_ACTIONS)

if (!fs.existsSync('out')) {
  console.log('error: no out/ folder. Build the site first (npm run build), from website/.')
  process.exit(1)
}

// Every exported page except 404.html, at its canonical URL: /vehicles for
// vehicles.html, / for index.html
const exported = fs.readdirSync('out', { recursive: true })
  .map((file) => file.split(path.sep).join('/'))
  .filter((file) => file.endsWith('.html') && file !== '404.html')
  .map((file) => SITE + file.replace(/\.html$/, '').replace(/^index$/, ''))
const listed = [...fs.readFileSync('public/sitemap.xml', 'utf8').matchAll(/<loc>([^<]*)<\/loc>/g)]
  .map((match) => match[1])

const problems = [
  ...exported.filter((url) => !listed.includes(url)).map((url) => `  not listed: ${url}`),
  ...listed.filter((url) => !exported.includes(url)).map((url) => `  not a page: ${url}`),
  ...listed.filter((url, i) => listed.indexOf(url) !== i).map((url) => `  listed twice: ${url}`)
]
if (problems.length) {
  const message = "List every exported page except 404 (a new team season also goes in the Navbar's teamLinks and the /MeetTheTeam redirect in .htaccess)."
  console.log(ci
    ? `::error file=website/public/sitemap.xml,title=sitemap.xml is out of date::${message}`
    : `error: sitemap.xml is out of date. ${message}`)
  console.log(problems.sort().join('\n'))
  process.exit(1)
}
console.log(`sitemap.xml lists all ${exported.length} exported pages`)

// With the git history, every page in the published copy has a lastmod,
// a real date no later than tomorrow (a commit date is in its committer's
// time zone). Without it, date-sitemap.mjs leaves the dates out on purpose. A
// page that isn't committed yet has no date either: that fails here only in
// CI, where everything is committed, so a missing date there is a bug.
const git = (...args) => execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
let history = false
try {
  history = git('rev-parse', '--is-shallow-repository') === 'false' && git('rev-parse', '--verify', '--quiet', 'HEAD') !== ''
} catch {}
const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10)
const entries = [...fs.readFileSync('out/sitemap.xml', 'utf8').matchAll(/<url><loc>([^<]*)<\/loc>(?:<lastmod>([^<]*)<\/lastmod>)?<\/url>/g)]
const undated = entries.filter(([, , lastmod]) => lastmod === undefined).map(([, loc]) => loc)
const dateProblems = entries.flatMap(([, loc, lastmod]) => {
  if (lastmod === undefined) return history && ci ? [`  no lastmod: ${loc}`] : []
  const date = new Date(lastmod)
  const real = /^\d{4}-\d{2}-\d{2}$/.test(lastmod) && !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === lastmod
  return real && lastmod <= tomorrow ? [] : [`  bad lastmod ${lastmod}: ${loc}`]
})
if (entries.length !== listed.length) dateProblems.push(`  out/sitemap.xml has ${entries.length} pages, public/sitemap.xml ${listed.length}`)
if (dateProblems.length) {
  const message = 'The lastmod dates in out/sitemap.xml are wrong or missing (see scripts/date-sitemap.mjs).'
  console.log(ci
    ? `::error file=website/scripts/date-sitemap.mjs,title=sitemap dates::${message}`
    : `error: ${message}`)
  console.log(dateProblems.join('\n'))
  process.exit(1)
}
if (!history) {
  console.log('out/sitemap.xml has no dates: no git history here (shallow clone?)')
} else if (undated.length) {
  console.log(`out/sitemap.xml dates ${entries.length - undated.length} of ${entries.length} pages. Not committed yet, so no date (CI dates every page): ${undated.join(', ')}`)
} else {
  console.log(`out/sitemap.xml dates all ${entries.length} pages`)
}
