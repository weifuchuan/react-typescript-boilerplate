const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const path = require("path");
const webpack = require("webpack");
const {
  resolveApp
} = require("./kit");
// @ts-ignore
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');

baseConfig.entry.unshift(require.resolve('react-dev-utils/webpackHotDevClient')); 

// @ts-ignore
module.exports = merge.smart(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',

  output: {
    path: resolveApp("dist/"),
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: "/",
    // @ts-ignore
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },

  plugins: [  
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new WatchMissingNodeModulesPlugin(resolveApp("node_modules")), 
  ],

  performance: {
    hints: false
  }
})