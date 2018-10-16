const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');
const path = require("path"); 

module.exports = merge(baseConfig, {
  output: { 
    pathinfo: true, 
    filename: 'static/js/bundle.js', 
    chunkFilename: 'static/js/[name].chunk.js', 
    publicPath: "/", 
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
})
