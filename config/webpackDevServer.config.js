'use strict';

// @ts-ignore
const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
// @ts-ignore
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
// @ts-ignore
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const config = require('./webpack.config.dev'); 
const {resolveApp} = require("./kit")

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

const proxyMiddleware = require("./proxyMiddleware"); 

// @ts-ignore
module.exports = function(proxy, allowedHost) {
  return {  
    clientLogLevel: 'none', 
    contentBase: resolveApp("public"), 
    watchContentBase: true,
    hot: true,
    // @ts-ignore
    publicPath: config.output.publicPath,
    quiet: true,
    watchOptions: {
      ignored: ignoredFiles(resolveApp("src")),
    }, 
    https: protocol === 'https',
    host: host,
    overlay: false,
    historyApiFallback: { 
      disableDotRule: true,
    },
    public: allowedHost,
    proxy,
    // @ts-ignore
    before(app) { 
      app.use(errorOverlayMiddleware()); 
      app.use(noopServiceWorkerMiddleware()); 
    }    ,
    // @ts-ignore
    after: function(app) {
      app.use(proxyMiddleware); 
    }
  };
};
