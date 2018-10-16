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

// function rmDir(dir) {
//   // Uncatch exception, if someone unaccessable, it should throw
//   fs.accessSync(dir);
//   var stat = fs.statSync(dir);
//   if (stat.isDirectory()) {
//     fs.readdirSync(dir).forEach(function (file) {
//       var filepath2 = path.join(dir, file);
//       fs.accessSync(filepath2);
//       var stat = fs.statSync(filepath2);
//       if (stat.isDirectory()) {
//         rmDir(filepath2);
//       } else {
//         fs.unlinkSync(filepath2);
//       }
//     });
//     fs.rmdirSync(dir);
//   } else {
//     return;
//   }
// }