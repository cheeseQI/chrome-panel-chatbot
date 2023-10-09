const path = require('path');

module.exports = {
  mode: 'production', // 'production' 'development' or 'none'
  entry: {
    contentScript: './src/contentScript.js',
    serviceWorker: './src/service-worker.js',
    sidepanel: './src/sidepanel.js',
    utils: './src/utils.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
