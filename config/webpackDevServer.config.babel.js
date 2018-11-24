// @flow
import errorOverlayMiddleware from 'react-dev-utils/errorOverlayMiddleware'
import noopServiceWorkerMiddleware from 'react-dev-utils/noopServiceWorkerMiddleware'
import ignoredFiles from 'react-dev-utils/ignoredFiles'
import config from './webpack.config.dev.babel'
import {
  resolveApp
} from "./kit"
import type {
  $Application
} from 'express';
import beforeMiddlewareSetter from './beforeMiddlewareSetter'; 
import afterMiddlewareSetter from './afterMiddlewareSetter'

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

export default function (proxy: any, allowedHost: any) {
  return {
    clientLogLevel: 'none',
    contentBase: resolveApp("public"),
    watchContentBase: true,
    hot: true,

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

    before(app: $Application) {
      app.use(errorOverlayMiddleware());
      app.use(noopServiceWorkerMiddleware());
      beforeMiddlewareSetter(app);
    },

    after(app: $Application) {
      afterMiddlewareSetter(app);
    }
  };
};