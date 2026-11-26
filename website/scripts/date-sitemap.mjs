// Adds a <lastmod> to every page in out/sitemap.xml, the copy of
// public/sitemap.xml that `next build` publishes: the date of the last commit
// that changed the page's own source. Search engines use it to decide what to
// crawl again. `npm run build` runs it after `next build`.
//
// Each page's source is its file in src/pages and, for the pages listed in
// EXTRA below, the data and components that fill it. Any commit to those
// files counts, a layout change included. Shared parts (navbar, footer,
// headers, styles) don't: they change every page at once. A team season's
// cards, the Alumni list and the Competitions list each come from their own
// block in teamData.js, so each gets its own date, not the date of the last
// edit anywhere in the file.
//
// The dates come from the git history, as committed: a page whose files or
// block aren't committed yet gets no date until they are. Without the history
// (a shallow clone, as in the Lighthouse workflow, or no repository at all)
// the sitemap is left without dates, since a guess would be wrong. CI and the
// deploy check out the full history (but not old file contents) for this.
import fs from 'node:fs'
import { execFileSync } from 'node:child_process'

const SITEMAP = 'out/sitemap.xml'
const SITE = 'https://blackbirduav.ca'
const TEAM_DATA = 'src/data/teamData.js'

// Pages filled from more than their own file. A { block } is a top-level key
// of teamData.js.
const EXTRA = {
  '/': ['src/data/faqData.js', 'src/data/sponsorData.js', 'src/components/sponsorGrid.js'],
  '/Competitions': [{ block: 'Competition' }],
  '/sponsor': ['src/data/sponsorData.js', 'src/components/sponsorSidebar.js'],
  '/Alumni': [{ block: 'Alumni' }]
}

function sourcesOf (route) {
  const season = route.match(/^\/MeetTheTeam\/(\d{4}-\d{4})$/)
  if (season) return ['src/pages/MeetTheTeam/[year].js', { block: season[1] }]
  const page = route === '/' ? 'src/pages/index.js' : `src/pages${route}.js`
  if (!fs.existsSync(page)) {
    throw new Error(`No src/pages file for ${route}: say in EXTRA in scripts/date-sitemap.mjs which files make it.`)
  }
  return [page, ...(EXTRA[route] ?? [])]
}

// Paths are taken as they are ([year].js isn't a pattern), and a
// log.showSignature setting can't put gpg's output where a date should be
const git = (...args) =>
  execFileSync('git', ['-c', 'log.showSignature=false', '--literal-pathspecs', ...args],
    { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024 })

// The whole history, with at least one commit
function hasHistory () {
  try {
    return git('rev-parse', '--is-shallow-repository').trim() === 'false' &&
      git('rev-parse', '--verify', '--quiet', 'HEAD').trim() !== ''
  } catch {
    return false
  }
}

// A top-level key's line in teamData.js, such as `  '2025-2026': {` or
// `  Alumni: {`
const topLevel = /^ {2}(['"]?)([\w-]+)\1\s*:/

// Where a block of teamData.js is in the last commit, as 1-based line
// numbers, or nothing if that commit doesn't have it: from its key's line to
// its closing brace, the last line starting `  }` before the next key (or the
// end of the object). A comment or spaces after the brace don't matter.
function blockRange (key) {
  if (!git('ls-tree', '--name-only', 'HEAD', '--', TEAM_DATA).trim()) return null
  const lines = git('show', `HEAD:./${TEAM_DATA}`).split('\n')
  const start = lines.findIndex((line) => line.match(topLevel)?.[2] === key)
  if (start === -1) return null
  let next = lines.findIndex((line, i) => i > start && (topLevel.test(line) || /^\}/.test(line)))
  if (next === -1) next = lines.length
  let end = next - 1
  while (end > start && !/^ {2}\}/.test(lines[end])) end--
  if (end === start) end = next - 1
  return [start + 1, end + 1]
}

// The date (YYYY-MM-DD, the committer's) of the last commit that changed a
// file, or a teamData.js block: git follows the block's lines back through
// the history, wherever edits around it moved them. Moving the block itself
// counts as changing it.
function lastChanged (source) {
  if (typeof source === 'string') {
    if (!fs.existsSync(source)) throw new Error(`${source} doesn't exist (scripts/date-sitemap.mjs)`)
    return git('log', '-1', '--format=%cs', '--', source).trim()
  }
  const key = source.block
  const text = fs.readFileSync(TEAM_DATA, 'utf8')
  if (!text.split('\n').some((line) => line.match(topLevel)?.[2] === key)) {
    throw new Error(`No ${key} block in ${TEAM_DATA} (scripts/date-sitemap.mjs)`)
  }
  const range = blockRange(key)
  if (!range) return ''
  return git('log', '-1', '--format=%cs', '--no-patch', '-L', `${range[0]},${range[1]}:${TEAM_DATA}`).trim().split('\n')[0]
}

const xml = fs.readFileSync(SITEMAP, 'utf8')
if (!hasHistory()) {
  console.log('date-sitemap: no git history here (shallow clone?), so out/sitemap.xml has no lastmod dates')
  process.exit(0)
}

const undated = []
const dated = xml.replace(/<url><loc>([^<]*)<\/loc><\/url>/g, (entry, loc) => {
  const route = loc.slice(SITE.length) || '/'
  const dates = sourcesOf(route).map(lastChanged)
  // Not committed yet, so no date until it is
  if (dates.includes('')) {
    undated.push(loc)
    return entry
  }
  const lastmod = dates.sort().at(-1)
  return `<url><loc>${loc}</loc><lastmod>${lastmod}</lastmod></url>`
})
fs.writeFileSync(SITEMAP, dated)
console.log(`date-sitemap: dated ${(dated.match(/<lastmod>/g) ?? []).length} of ${(xml.match(/<url>/g) ?? []).length} pages in out/sitemap.xml`)
if (undated.length) {
  console.log(`date-sitemap: not committed yet, so no date: ${undated.join(', ')}`)
}
