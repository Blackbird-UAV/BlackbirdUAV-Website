// Lighthouse CI settings for `npm run lighthouse`, which audits the static
// export in out/ (run `npm run build` first), and `npm run lighthouse:live`,
// which audits https://blackbirduav.ca instead. npm names the running script
// in npm_lifecycle_event, which works the same on every OS.
const live = process.env.npm_lifecycle_event === 'lighthouse:live'

module.exports = {
  ci: {
    collect: {
      ...(live
        ? { url: ['https://blackbirduav.ca/'] }
        : {
            // Serves out/ and audits every page in it, team years included,
            // except the 404 page. By default it would stop after 5 pages.
            staticDistDir: './out',
            maxAutodiscoverUrls: 0,
            autodiscoverUrlBlocklist: ['/404.html']
          }),
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox',
        preset: 'desktop' // or mobile
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }]
      }
    },
    upload: {
      target: 'temporary-public-storage'
    }
  }
}
