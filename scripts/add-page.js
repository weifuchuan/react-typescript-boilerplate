const process = require("process")
const fs = require("fs");
const path = require("path");
const compBuild = require("./assets/src/page/index");
const {
  resolveApp
} = require("../config/kit")

const pageNames = process.argv.length > 2 ? process.argv.slice(2) : ["Page"];

for (let pageName of pageNames) {
  pageName = pageName.trim(); 

  const ps = compBuild(pageName);

  try {
    fs.mkdirSync(resolveApp(`src/pages/${pageName}`));
    fs.writeFileSync(resolveApp(`src/pages/${pageName}/index.tsx`), ps);
    fs.writeFileSync(resolveApp(`src/pages/${pageName}/index.scss`), `.${pageName}Container{

}
  `);
  } catch (e) {
    console.error(e);
  }
}