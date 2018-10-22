const process = require("process")
const fs = require("fs");
const path = require("path");
const compBuild = require("./assets/src/component/index");
const {
  resolveApp
} = require("../config/kit")

const names = process.argv.length > 2 ? process.argv.slice(2) : ["Comp"];

for (let name of names) {
  name = name.trim(); 

  const ps = compBuild(name);

  try {
    fs.mkdirSync(resolveApp(`src/components/${name}`));
    fs.writeFileSync(resolveApp(`src/components/${name}/index.tsx`), ps);
    fs.writeFileSync(resolveApp(`src/components/${name}/index.scss`), `.${name}Container{

}
  `);
  } catch (e) {
    console.error(e);
  }
}