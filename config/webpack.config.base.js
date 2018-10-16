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
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const os = require("os");
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});

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
  entry: [
    require.resolve('./polyfills'),
    resolveApp("src/index.tsx")
  ],
  module: {
    // loaders
    rules: [{
        test: /\.(js)|(jsx)|(ts)|(tsx)/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=jtsx',
      },
      {
        test: /\.(sa|sc)ss/,
        exclude: /node_modules/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPluginLoader,
          'css-loader',
          'postcss-loader',
          'fast-sass-loader'
        ],
      },
      {
        test: /\.less/,
        exclude: /node_modules/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPluginLoader,
          "css-loader", // translates CSS into CommonJS
          "less-loader" // compiles Less to CSS
        ],
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPluginLoader,
          "css-loader", // translates CSS into CommonJS
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 4096,
          name: 'static/media/[name].[hash:8].[ext]',
          fallback: "file-loader"
        },
      },
    ]
  },

  // how to resolve modules
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
  },

  // plugins
  plugins: [
    new HappyPack({
      id: "jtsx",
      threadPool: happyThreadPool,
      loaders: [{
        loader: "babel-loader"
      }, {
        loader: "ts-loader",
        options: {
          happyPackMode: true
        }
      }]
    }),
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true
    }),
    new ForkTsCheckerNotifierWebpackPlugin({
      excludeWarnings: true,
      skipSuccessful: true
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: resolveApp("public/index.html"), // 配置文件模板
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
        minifyURLs: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[name].css",
      chunkFilename: "static/css/[id].css"
    })
  ],

  optimization: {
    minimizer: [
      new ParallelUglifyPlugin({
        cacheDir: '.cache/',
        uglifyJS: {
          output: {
            comments: false, 
          },
          compress: {
            warnings: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
}