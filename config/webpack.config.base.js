"strict";

const {
  resolveApp,
  postcssLoader
} = require("./kit")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production'

const MiniCssExtractPluginLoader = {
  loader: MiniCssExtractPlugin.loader,
  options: {
    // you can specify a publicPath here
    // by default it use publicPath in webpackOptions.output
    // publicPath: '../'
  }
};

module.exports = {
  entry: {
    main: resolveApp("src/index.tsx")
  },
  module: {
    // loaders
    rules: [{
      test: /\.(js)|(jsx)|(ts)|(tsx)/,
      exclude: /node_modules/,
      use: [{
          loader: "babel-loader"
        },
        {
          loader: "ts-loader",
          options: {
            transpileOnly: true
          }
        }
      ]
    }, {
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      loader: 'url-loader',
      options: {
        limit: 20480,
        name: 'static/media/[name].[hash:8].[ext]',
        fallback: "file-loader"
      },
    }, {
      test: /\.(sa|sc|c)ss$/,
      use: [
        devMode ? 'style-loader' : MiniCssExtractPluginLoader,
        'css-loader',
        'postcss-loader',
        'sass-loader',
      ],
    }, {
      test: /\.less$/,
      use: [
        devMode ? 'style-loader' : MiniCssExtractPluginLoader,
        "css-loader", // translates CSS into CommonJS
        "less-loader" // compiles Less to CSS
      ]
    }, {
      test: /\.css$/,
      use: [
        devMode ? 'style-loader' : MiniCssExtractPluginLoader,
        "css-loader", // translates CSS into CommonJS
      ]
    }]
  },

  // how to resolve modules
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },

  // plugins
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new ForkTsCheckerNotifierWebpackPlugin({
      excludeWarnings: true,
      skipSuccessful: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: resolveApp("public/index.html"), // 配置文件模板
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
}