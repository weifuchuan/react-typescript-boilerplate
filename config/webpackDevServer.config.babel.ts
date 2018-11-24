const errorOverlayMiddleware = require('react-dev-utils/errorOverlayMiddleware');
const noopServiceWorkerMiddleware = require('react-dev-utils/noopServiceWorkerMiddleware');
const ignoredFiles = require('react-dev-utils/ignoredFiles');
const config = require('./webpack.config.dev.babel');
import { resolveApp } from './kit';
import express from 'express';
import beforeMiddlewareSetter from './beforeMiddlewareSetter';
import afterMiddlewareSetter from './afterMiddlewareSetter';

const protocol = process.env.HTTPS === 'true' ? 'https' : 'http';
const host = process.env.HOST || '0.0.0.0';

module.exports = function(proxy: any, allowedHost: any) {
	return {
		clientLogLevel: 'none',
		contentBase: resolveApp('public'),
		watchContentBase: true,
		hot: true,

		publicPath: config.output!.publicPath,
		quiet: true,
		watchOptions: {
			ignored: ignoredFiles(resolveApp('src'))
		},
		https: protocol === 'https',
		host: host,
		overlay: false,
		historyApiFallback: {
			disableDotRule: true
		},
		public: allowedHost,
		proxy,

		before(app: express.Application) {
			app.use(errorOverlayMiddleware());
			app.use(noopServiceWorkerMiddleware());
			beforeMiddlewareSetter(app);
		},

		after(app: express.Application) {
			afterMiddlewareSetter(app);
		}
	};
};
