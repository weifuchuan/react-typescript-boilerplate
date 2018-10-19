// @ts-nocheck
const path = require('path');
const fs = require("fs"); 

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const autoprefixer = require('autoprefixer')({
  browsers: [
    '>1%',
    'last 4 versions',
    'Firefox ESR',
    'not ie < 9', // React doesn't support IE8 anyway
  ],
  flexbox: 'no-2009',
});

const precss = require('precss')();
const flexBugFixes = require('postcss-flexbugs-fixes')();

const postcssLoader = {
  loader: require.resolve('postcss-loader'),
  options: { 
    plugins: () => [
      flexBugFixes,
      autoprefixer
    ],
  },
};

const precssLoader = {
  loader: require.resolve('postcss-loader'),
  options: { 
    plugins: () => [
      precss,
      flexBugFixes,
      autoprefixer
    ],
  },
};

module.exports = {
  resolveApp,

  postcssLoader,
  precssLoader
}