const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const path = require("path");
const {
  resolveApp
} = require('./kit') 
 

module.exports = merge(baseConfig, {
  output: {
    path: resolveApp('build'),
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: "/",
    devtoolModuleFilenameTemplate: info =>
      path
      .relative(resolveApp('src'), info.absoluteResourcePath)
      .replace(/\\/g, '/'),
  },
 
})