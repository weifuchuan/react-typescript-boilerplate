const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const path = require("path");
const webpack = require("webpack");
const {
  resolveApp
} = require("./kit")

baseConfig.entry = ['webpack-hot-middleware/client', ...baseConfig.entry];

module.exports = merge.smart(baseConfig, {
  output: {
    path: resolveApp("dist/"),
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: "/",
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
})