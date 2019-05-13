import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import fs from 'fs-extra';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack from 'webpack';
import pagesConfig from '../src/pages-config';
import { resolveApp } from './kit';
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const log = require('single-line-log').stdout;
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

const devMode: boolean = process.env.NODE_ENV !== 'production';

// const MiniCssExtractPluginLoader = {
//   loader: MiniCssExtractPlugin.loader,
//   options: {}
// };

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    sourceMap: devMode
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

function entryBuild(): webpack.Entry {
  const entry: webpack.Entry = {};
  for (let page of pagesConfig) {
    const { name } = page;
    const indexFile = resolveApp(
      `src/${name}/${page.entry ? page.entry : 'index.tsx'}`
    );
    if (fs.existsSync(indexFile)) {
      entry[name] = [ require.resolve('./polyfills'), indexFile ];
    } else {
      console.error(`${name} doesn't exsits! `);
    }
  }
  return entry;
}

export default {
  entry: entryBuild(),
  module: {
    rules: [
      {
        test: /\.(js)|(jsx)/,
        exclude: /node_modules/,
        use: [ 'cache-loader', 'babel-loader' ]
      },
      {
        test: /\.tsx?$/,
        use: [
          'cache-loader',
          'babel-loader',
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              experimentalWatchApi: true
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        loader: 'webpack-ant-icon-loader',
        enforce: 'pre',
        include: [ path.resolve('node_modules/@ant-design/icons/lib/dist') ]
      },
      {
        test: /\.less/,
        exclude: /node_modules/,
        use: [
          // devMode ? 'style-loader' : MiniCssExtractPluginLoader,
          'style-loader',
          cssLoader,
          postcssLoader,
          lessLoader
        ]
      },
      {
        test: /\.css$/,
        use: [
          // devMode ? 'style-loader' : MiniCssExtractPluginLoader,
          'style-loader',
          cssLoader,
          postcssLoader
        ]
      },
      {
        test: /\.((png)|(jpe?g)|(gif)|(bmp))$/,
        loader: 'url-loader',
        options: {
          limit: 16384,
          name: 'static/media/[name].[hash:8].[ext]',
          fallback: 'file-loader'
        }
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 16384,
          name: 'static/fonts/[name].[hash:8].[ext]',
          fallback: 'file-loader'
        }
      }
    ]
  },

  // how to resolve modules
  resolve: {
    extensions: [ '.js', '.jsx', '.ts', '.tsx', '.json' ],
    alias: {
      'react-native': 'react-native-web'
    },
    plugins: [ new TsconfigPathsPlugin() ]
  },

  // plugins
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(devMode)
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    // new ForkTsCheckerWebpackPlugin({
    //   checkSyntacticErrors: true,
    //   watch: resolveApp('src'),
    //   async: devMode
    // }),
    ...(devMode
      ? []
      : [
          new webpack.ProgressPlugin(
            (percent: any, message: any, ...args: any[]) => {
              log(
                `builded: 【 ${Math.floor(
                  100 * percent
                )} % 】: ${message} ${args}`
              );
            }
          ),
          // new MiniCssExtractPlugin({
          //   filename: 'static/css/[name].[hash:8].css',
          //   chunkFilename: 'static/css/[id].[hash:8].css'
          // }),
          new BundleAnalyzerPlugin()
        ]),
    ...htmlWebpackPluginBuild(),
    devMode ? null : new HtmlWebpackInlineSourcePlugin()
  ].filter((x) => !!x),
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
} as webpack.Configuration;

function htmlWebpackPluginBuild(): HtmlWebpackPlugin[] {
  return pagesConfig.map((p) => {
    return new HtmlWebpackPlugin({
      chunks: [ p.name ],
      filename: `${p.filename ? p.filename : p.name}.html`, // 配置输出文件名和路径
      template: p.template
        ? resolveApp(`src/${p.name}/${p.template}`)
        : resolveApp('public/index.html'), // 配置文件模板
      title: p.title ? p.title : p.name,
      inject: true,
      ...p.inlineSource && !devMode ? { inlineSource: p.inlineSource } : {},
      minify: devMode
        ? false
        : {
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
    });
  });
}
