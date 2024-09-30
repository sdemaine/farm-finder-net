import { run } from 'react-snap';

run({
  // Your react-snap options here
  puppeteerArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  puppeteerExecutablePath: '/usr/bin/chromium-browser',
  minifyHtml: {
    collapseWhitespace: false,
    removeComments: false
  },
  fixWebpackChunksIssue: false,
  removeBlobs: true,
  cacheAjaxRequests: true,
  http2PushManifest: true,
  removeScriptTags: false,
  removeStyleTags: false,
  fixInsertRule: true,
  indexSources: true,
  asyncScriptTags: true,
  preconnectThirdParty: false,
  puppeteer: {
    cache: false
  }
}).then(() => {
  console.log('react-snap completed successfully');
}).catch((error) => {
  console.error('react-snap failed:', error);
  process.exit(1);
});