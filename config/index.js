'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')
const localEnv = require('./local.env')
const os = require('os')
const STATIC_PATH = 'https://cdn.chipsgames.com/h5client/'

function getIPAdress() {
  let interfaces = os.networkInterfaces()
  for (let devName in interfaces) {
    let iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}

function getBuildPath() {
  const prodPath = '../mobile-' + process.env.npm_package_version
  const path = '../mobile'
  if (process.env.NODE_ENV === 'production') {
    return prodPath
  }else{
    return path
  }
}

function getAssetsPublicPath() {
  if (process.env.NODE_ENV === 'production') {
    return STATIC_PATH
  } else {
    return './'
  }
}

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    // proxyTable: {
    //   '/api/': {
    //     // target: 'http://172.16.100.53:8661',
    //     // target: 'http://localhost:3000',
    //     target: 'http://172.16.100.51:8641',
    //     changeOrigin: true,
    //     pathRewrite: {

    //     }
    //   }
    // },

    // Various Dev Server settings
    // host: 'localhost',
    host: getIPAdress(),
    port: 8081, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    // port: 80, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    disableHostCheck: true,
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, getBuildPath() + '/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, getBuildPath() ),
    assetsSubDirectory: 'static',
    // assetsPublicPath: './',
    assetsPublicPath: getAssetsPublicPath(),
    /**
     * Source Maps
     */

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
