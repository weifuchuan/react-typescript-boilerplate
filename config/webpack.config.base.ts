import { resolveApp } from './kit';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
import os from 'os';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
const HappyPack = require('happypack');

const devMode: boolean = process.env.NODE_ENV !== 'production';

const happyThreadPool: any = HappyPack.ThreadPool({
	size: devMode ? 1 : os.cpus().length
});

const MiniCssExtractPluginLoader = {
	loader: MiniCssExtractPlugin.loader,
	options: {
	}
};

const autoprefixer = require('autoprefixer')({
	browsers: [
		'>1%',
		'last 4 versions',
		'Firefox ESR',
		'not ie < 9' // React doesn't support IE8 anyway
	],
	flexbox: 'no-2009'
});

const flexBugFixes = require('postcss-flexbugs-fixes')();

const postcssLoader = {
	loader: require.resolve('postcss-loader'),
	options: {
		sourceMap: devMode,
		plugins: () => [ flexBugFixes, autoprefixer ]
	}
};

const cssLoader = {
	loader: 'css-loader',
	options: {
		sourceMap: devMode,
		localIdentName: '[local]__[path][name]--[hash:base64:5]'
	}
};

const lessLoader = {
	loader: 'less-loader',
	options: {
		sourceMap: devMode
	}
};

const scssLoader = devMode
	? {
			loader: 'sass-loader',
			options: {
				sourceMap: devMode
			}
		}
	: 'fast-sass-loader';

export default {
	entry: [ require.resolve('./polyfills'), resolveApp('src/index.tsx') ],
	module: {
		// loaders
		rules: [
			...(devMode
				? [
						{
							test: /\.(js)|(jsx)|(mjs)/,
							exclude: /node_modules/,
							use: [
								{
									loader: 'babel-loader'
								}
							]
						},
						{
							test: /\.(ts)|(tsx)/,
							exclude: /node_modules/,
							use: [
								{
									loader: 'babel-loader'
								},
								{
									loader: 'ts-loader',
									options: {
										happyPackMode: true,
										compilerOptions: {
											sourceMap: devMode
										}
									}
								}
							]
						},
						{
							test: /\.(sa|sc)ss/,
							exclude: /node_modules/,
							use: [ 'style-loader', cssLoader, postcssLoader, scssLoader ]
						},
						{
							test: /\.less/,
							exclude: /node_modules/,
							use: [ 'style-loader', cssLoader, postcssLoader, lessLoader ]
						}
					]
				: [
						{
							test: /\.(js)|(jsx)|(mjs)/,
							exclude: /node_modules/,
							use: 'happypack/loader?id=jsx'
						},
						{
							test: /\.(ts)|(tsx)/,
							exclude: /node_modules/,
							use: 'happypack/loader?id=tsx'
						},
						{
							test: /\.(sa|sc)ss/,
							exclude: /node_modules/,
							use: 'happypack/loader?id=scss'
						},
						{
							test: /\.less/,
							exclude: /node_modules/,
							use: 'happypack/loader?id=less'
						}
					]),
			{
				test: /\.css$/,
				use: [ devMode ? 'style-loader' : MiniCssExtractPluginLoader, cssLoader, postcssLoader ]
			},
			{
				test: [ /\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/ ],
				loader: 'url-loader',
				options: {
					limit: 4096,
					name: 'static/media/[name].[hash:8].[ext]',
					fallback: 'file-loader'
				}
			}
		]
	},

	// how to resolve modules
	resolve: {
		extensions: [ '.js', '.jsx', '.ts', '.tsx', '.json' ],

		plugins: [ new TsconfigPathsPlugin({}) ]
	},

	// plugins
	plugins: [
		new webpack.DefinePlugin({
			__DEV__: JSON.stringify(devMode)
		}),
		...(devMode
			? []
			: [
					new HappyPack({
						id: 'jsx',
						threadPool: happyThreadPool,
						loaders: [
							{
								loader: 'babel-loader'
							}
						]
					}),
					new HappyPack({
						id: 'tsx',
						threadPool: happyThreadPool,
						loaders: [
							{
								loader: 'babel-loader'
							},
							{
								loader: 'ts-loader',
								options: {
									happyPackMode: true,
									compilerOptions: {
										sourceMap: devMode
									}
								}
							}
						]
					}),
					new HappyPack({
						id: 'scss',
						threadPool: happyThreadPool,
						loaders: [ 'style-loader', cssLoader, postcssLoader, scssLoader ]
					}),
					new HappyPack({
						id: 'less',
						threadPool: happyThreadPool,
						loaders: [ 'style-loader', cssLoader, postcssLoader, lessLoader ]
					})
				]),
		new ForkTsCheckerWebpackPlugin({
			checkSyntacticErrors: true,
			watch: resolveApp('src')
		}),
		new ForkTsCheckerNotifierWebpackPlugin({
			excludeWarnings: true,
			skipSuccessful: true
		}),
		new HtmlWebpackPlugin({
			filename: 'index.html', // 配置输出文件名和路径
			template: resolveApp('public/index.html'), // 配置文件模板
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			}
		}),
		new MiniCssExtractPlugin({
			filename: 'static/css/[name]-[hash].css',
			chunkFilename: 'static/css/[id]-[hash].css'
		})
	],

	optimization: {
		minimizer: [
			new ParallelUglifyPlugin({
				cacheDir: '.cache/',
				uglifyJS: {
					output: {
						comments: false
					},
					compress: {
						warnings: false
					}
				}
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	}
} as webpack.Configuration;
