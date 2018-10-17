const webpack = require('webpack')
const middleware = require('webpack-dev-middleware')
const webpackOptions = require('../config/webpack.config.dev') // webpack 配置文件的路径
const openBrowser = require('react-dev-utils/openBrowser');
const qs = require("qs");
const timeout = require('connect-timeout');
const proxy = require('http-proxy-middleware');

// 本地的开发环境默认使用 development mode
webpackOptions.mode = 'development'
// https://github.com/webpack-contrib/webpack-hot-middleware#client
const webpackHotMiddlewareClient = {
  path: "/__webpack_hmr",
  timeout: 2000,
  reload: true,
  autoConnect: true
};
webpackOptions.entry = [
  `webpack-hot-middleware/client?${qs.stringify(webpackHotMiddlewareClient)}`,
  ...webpackOptions.entry
];

const compiler = webpack(webpackOptions)
const express = require('express')
const app = express()

app.use(middleware(compiler, {
  noInfo: true,
  publicPath: webpackOptions.output.publicPath
}));

app.use(require("webpack-hot-middleware")(compiler));

app.use(timeout(30 * 1000));
app.use((req, res, next) => {
  if (!req.timedout) next();
});

// Proxy server 
// app.use(proxy('/', {
//   target: "http://localhost:80",
//   changeOrigin: true,
//   ws: true,
// }))

const port = 3000;

app.listen(port, () => {
  console.log(`App started on port ${port}. Open http://localhost:${port}/ `)
  openBrowser(`http://localhost:${port}/`)
})