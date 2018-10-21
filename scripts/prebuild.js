const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const {resolveApp} = require("../config/kit")

fs.emptyDirSync(resolveApp("build"));
copyPublicFolder();

function copyPublicFolder() {
  fs.copySync(resolveApp("public"), resolveApp("build"), {
    dereference: true,
    filter: file => file !== resolveApp('public/index.html'),
  });
} 