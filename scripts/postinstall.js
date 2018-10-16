const fs = require("fs");
const path = require("path");

// 移动自定义类型定义
(function moveTypes() {
  const moduleNames = fs.readdirSync(path.resolve(__dirname, "assets/types"))
  for (const mn of moduleNames) {
    try {
      for (const fn of fs.readdirSync(path.resolve(__dirname, "assets/types/", mn))) {
        try {
          fs.copyFileSync(
            path.resolve(__dirname, `assets/types/${mn}/`, fn),
            path.resolve(__dirname, `../node_modules/${mn}/`, fn)
          );
        } catch (e) {
          console.error(e);
        }
      }
    } catch (e) {
      console.error(e);
    }
  }
})()