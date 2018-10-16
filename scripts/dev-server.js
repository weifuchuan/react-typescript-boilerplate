const webpack = require('webpack')
const middleware = require('webpack-dev-middleware')
const webpackOptions = require('../config/webpack.config.dev') // webpack 配置文件的路径
const openBrowser = require('react-dev-utils/openBrowser');

// 本地的开发环境默认使用 development mode
webpackOptions.mode = 'development'

const compiler = webpack(webpackOptions)
const express = require('express')
const app = express()

app.use(middleware(compiler, {
  inline: true,
  lazy: false,
  hot: true, 
}));

app.use(require("webpack-hot-middleware")(compiler));

// 其他 Web 服务中间件
// app.use(...)

app.listen(3000, () => console.log('App started on port 3000. Open http://localhost:3000/ '))
 