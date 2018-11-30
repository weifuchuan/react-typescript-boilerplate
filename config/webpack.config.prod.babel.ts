import merge from 'webpack-merge';
import baseConfig from './webpack.config.base';
import path from 'path';
import { resolveApp } from './kit';
import process from 'process'; 

export default merge(baseConfig as any, {
	mode: 'production',
	devtool: false,

	output: {
		path: resolveApp('build'),
		filename: 'static/js/[name]-[chunkhash:8].bundle.js',
		chunkFilename: 'static/js/[id]-[chunkhash:8].chunk.js',
		publicPath: process.env.PUBLIC_PATH ? process.env.PUBLIC_PATH : '/',
	}
});
