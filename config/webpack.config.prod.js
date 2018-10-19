const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const path = require("path");
const {
  resolveApp
} = require('./kit')
const process = require("process");

// @ts-ignore
module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: false,

  output: {
    path: resolveApp('build'),
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    publicPath: process.env.PUBLIC_PATH ? process.env.PUBLIC_PATH : "/",
    // @ts-ignore
    devtoolModuleFilenameTemplate: info =>
      path
      .relative(resolveApp('src'), info.absoluteResourcePath)
      .replace(/\\/g, '/'),
  },
  
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM'
  },
})