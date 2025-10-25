module.exports = {
  ci: {
    collect: {
      url: [
        'https://blackbirduav.ca',
      ],
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--no-sandbox',
        preset: 'desktop'                          // or mobile
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
};
