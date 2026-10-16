// Fails when public/sitemap.xml and the exported site disagree. The sitemap
// is written by hand, so a new team season or page is easy to leave out.
// Run from website/ after a build: `npm run check:sitemap`. `npm test` and CI
// both run it.
import fs from 'node:fs'
import path from 'node:path'

const SITE = 'https://blackbirduav.ca/'

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
  console.log(process.env.GITHUB_ACTIONS
    ? `::error file=website/public/sitemap.xml,title=sitemap.xml is out of date::${message}`
    : `error: sitemap.xml is out of date. ${message}`)
  console.log(problems.sort().join('\n'))
  process.exit(1)
}
console.log(`sitemap.xml lists all ${exported.length} exported pages`)
