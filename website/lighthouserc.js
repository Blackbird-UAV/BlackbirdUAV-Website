// Lighthouse CI settings for `npm run lighthouse`, which audits the static
// export in out/ (run `npm run build` first) as the Lighthouse workflow
// (.github/workflows/lighthouse.yml) does on every pull request, and
// `npm run lighthouse:live`, which audits the same pages on
// https://blackbirduav.ca instead. npm names the running script in
// npm_lifecycle_event, which works the same on every OS.
const fs = require('node:fs')
const path = require('node:path')

const live = process.env.npm_lifecycle_event === 'lighthouse:live'

// Season pages are named after their years (2026-2027), so the last in sort
// order is the newest, and a new season is audited with no edit here. They
// are read from the sitemap, which CI checks against the export.
function newestTeamPage () {
  const sitemap = fs.readFileSync(path.join(__dirname, 'public/sitemap.xml'), 'utf8')
  const seasons = [...sitemap.matchAll(/\/MeetTheTeam\/(\d{4}-\d{4})</g)]
    .map((match) => match[1])
    .sort()
  if (!seasons.length) throw new Error('No team season in public/sitemap.xml')
  return `/MeetTheTeam/${seasons.at(-1)}`
}

// The pages audited, and what each downloaded in October 2026, in KiB as
// sent gzipped (LHCI's server compresses like the host does): in all, in
// scripts and in images. These sizes are the same in every run. Change a
// page's numbers when it grows on purpose; its budgets are worked out from
// them below. The team page's are 2026-2027's, which a new season's page is
// held to until they're changed. Older seasons are left out: each is the
// same page with another roster.
const PAGES = [
  { path: '/', total: 1134, script: 218, image: 813 },
  { path: '/vehicles', total: 670, script: 216, image: 393 },
  { path: '/Competitions', total: 1206, script: 226, image: 899 },
  { path: '/Alumni', total: 594, script: 235, image: 297 },
  { path: '/joinTheTeam', total: 514, script: 220, image: 197 },
  { path: '/sponsor', total: 616, script: 218, image: 320 },
  { path: newestTeamPage(), total: 839, script: 239, image: 484 }
]

// LHCI serves the export with express.static, which doesn't map /vehicles to
// vehicles.html as the host's .htaccess does, so there each page is named by
// its file.
const urlOf = (page) =>
  live
    ? `https://blackbirduav.ca${page.path}`
    : page.path === '/' ? '/index.html' : `${page.path}.html`

// How much more a page may download before the check fails. Lighthouse's
// slow 4G takes about a second for 200 KiB. Scripts get less, as the phone
// also has to run them. A big new library goes over, and so does a
// full-size camera photo near the top of a page (a hero image, the newest
// competition, the first few headshots).
//
// Only what the phone downloads while the page loads is counted. Images
// a few screens down are lazy and load only when scrolled to, so a
// full-size photo there (the last sponsors on the home page, the oldest
// competition, the later headshots) doesn't fail the check. Resizing photos
// is npm run resize-images' job (see the README).
const ALLOWANCE_KIB = { total: 200, script: 50, image: 200 }

const budget = (page, kind) => ['error', { maxNumericValue: (page[kind] + ALLOWANCE_KIB[kind]) * 1024 }]
const escapeRegExp = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

module.exports = {
  ci: {
    collect: {
      ...(!live && { staticDistDir: './out' }),
      url: PAGES.map(urlOf),
      numberOfRuns: 3,
      // Otherwise Lighthouse's defaults: a mid-range phone on slow 4G, with
      // the throttling simulated, so the runner's own network doesn't count.
      settings: {
        // Each run would count as a visit in the team's Google Analytics, and
        // its script changes on Google's schedule rather than with our code.
        blockedUrlPatterns: ['*googletagmanager.com*', '*google-analytics.com*'],
        chromeFlags: [
          // Chrome starts loading lazy images further ahead the slower it
          // judges the connection. On GitHub's runners it loads them as it
          // does when it can't tell the connection's speed, even when told
          // the connection is 4G, which is further ahead than on a machine
          // it rates 4G (the home page downloads 813 KiB of images instead of
          // 375). Told it can't tell, Chrome elsewhere downloads the same
          // images as there, so the budgets above hold on every machine.
          '--force-effective-connection-type=Unknown',
          // Chrome won't start as root (in a container, say) with its
          // sandbox on. GitHub's runners don't run as root, so they keep it.
          ...(process.getuid?.() === 0 ? ['--no-sandbox'] : [])
        ].join(' ')
      }
    },
    upload: {
      // Kept on disk (and, on GitHub, in the run's artifact), never sent to
      // a public report server
      target: 'filesystem',
      outputDir: './lighthouse-reports',
      // One report per page: the run closest to the median, which LHCI
      // writes last, so it replaces the others. Named after the page's
      // path, and on the live site its host too: the home page's path there
      // is /, which alone would make a hidden file, .report.html.
      reportFilenamePattern: `${live ? '%%HOSTNAME%%-' : ''}%%PATHNAME%%.report.%%EXTENSION%%`
    },
    assert: {
      // Each value is the median of a page's runs, so one slow run (a busy
      // runner) can't fail the check on its own.
      assertMatrix: [
        {
          matchingUrlPattern: '.*',
          aggregationMethod: 'median',
          assertions: {
            // Timings vary from run to run and from machine to machine, so
            // these floors sit well below the pages' own numbers. When they
            // were set, in three runs on GitHub's runners, every page's
            // median scored 79 or more, with an LCP of 5.1 s or less and a
            // TBT of 190 ms or less, the slowest being the team page (79-81,
            // 5.0-5.1 s). No page's score moved by more than 2 points between
            // runs, or its LCP by more than 0.2 s.
            'categories:performance': ['error', { minScore: 0.7 }],
            'largest-contentful-paint': ['error', { maxNumericValue: 6000 }],
            'total-blocking-time': ['error', { maxNumericValue: 600 }],
            // Layout shift doesn't depend on the runner's speed. 0.1 is the
            // most Google counts as good; the pages are at 0.001 or less.
            'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
            // Reported on the summary page; below these, the log warns too.
            'categories:accessibility': ['warn', { minScore: 0.95 }],
            'categories:best-practices': ['warn', { minScore: 0.95 }],
            'categories:seo': ['warn', { minScore: 0.95 }]
          }
        },
        ...PAGES.map((page) => ({
          matchingUrlPattern: `${escapeRegExp(urlOf(page))}$`,
          aggregationMethod: 'median',
          assertions: {
            // The summary's page weight
            'total-byte-weight': budget(page, 'total'),
            'resource-summary:script:size': budget(page, 'script'),
            'resource-summary:image:size': budget(page, 'image')
          }
        }))
      ]
    }
  }
}
