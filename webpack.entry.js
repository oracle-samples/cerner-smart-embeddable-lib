// This is the entry point for webpack to distribute assets

// Require all less files and output them as css for non webpack consumers
require('./src/less/manifest.less');

// Require all JS and output as a single js bundle.
// Note, we are requiring the es6 js.
require('./src/js');
