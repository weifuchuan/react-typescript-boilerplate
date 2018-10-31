"strict";

const {
  resolveApp,
  postcssLoader
} = require("./kit")
const webpack = require("webpack")
// @ts-ignore
const HtmlWebpackPlugin = require('html-webpack-plugin')
// @ts-ignore
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// @ts-ignore
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// @ts-ignore
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// @ts-ignore
const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// @ts-ignore
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
const os = require("os");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require("path");

const devMode = process.env.NODE_ENV !== 'production'; 

// @ts-ignore
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({
  size: devMode ? 1 : os.cpus().length
});

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
    rules: [
      ...(devMode ? [{
          test: /\.(js)|(jsx)|(ts)|(tsx)/,
          exclude: /node_modules/,
          use: [{
            loader: "babel-loader"
          }, {
            loader: "ts-loader",
            options: {
              happyPackMode: true,
              compilerOptions: {
                "sourceMap": devMode,
              }
            }
          }]
        }, {
          test: /\.(sa|sc)ss/,
          exclude: /node_modules/,
          use: [
            // devMode ? 'style-loader' : MiniCssExtractPluginLoader,
            'style-loader',
            'css-loader',
            'postcss-loader',
            'fast-sass-loader'
          ],
        },
        {
          test: /\.less/,
          exclude: /node_modules/,
          use: [
            // devMode ? 'style-loader' : MiniCssExtractPluginLoader,
            'style-loader',
            "css-loader", // translates CSS into CommonJS
            'postcss-loader',
            "less-loader" // compiles Less to CSS
          ],
        },
      ] : [{
          test: /\.(js)|(jsx)|(ts)|(tsx)/,
          exclude: /node_modules/,
          use: 'happypack/loader?id=jtsx',
        },
        {
          test: /\.(sa|sc)ss/,
          exclude: /node_modules/,
          use: 'happypack/loader?id=scss',
        },
        {
          test: /\.less/,
          exclude: /node_modules/,
          use: 'happypack/loader?id=less',
        },
      ]),
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPluginLoader,
          // 'style-loader',
          "css-loader", // translates CSS into CommonJS
          'postcss-loader',
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
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    // @ts-ignore
    plugins: [new TsconfigPathsPlugin({ /* options: see below */ })],
  },

  // plugins
  plugins: [    
    new webpack.DefinePlugin({ 
      __DEV__: JSON.stringify(devMode),
    }),
    ...(devMode ? [] : [
      new HappyPack({
        id: "jtsx",
        threadPool: happyThreadPool,
        loaders: [{
          loader: "babel-loader"
        }, {
          loader: "ts-loader",
          options: {
            happyPackMode: true,
            compilerOptions: {
              "sourceMap": devMode,
            }
          }
        }]
      }),
      new HappyPack({
        id: "scss",
        threadPool: happyThreadPool,
        loaders: [
          'style-loader',
          'css-loader',
          postcssLoader,
          'fast-sass-loader'
        ]
      }),
      new HappyPack({
        id: "less",
        threadPool: happyThreadPool,
        loaders: [
          'style-loader',
          'css-loader',
          postcssLoader,
          'less-loader'
        ]
      })
    ]), 
    new ForkTsCheckerWebpackPlugin({
      checkSyntacticErrors: true,
      watch: resolveApp("src"),
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
      filename: "static/css/[name]-[hash].css",
      chunkFilename: "static/css/[id]-[hash].css"
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