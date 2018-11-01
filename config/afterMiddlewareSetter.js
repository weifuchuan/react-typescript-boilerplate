// @ts-nocheck 
const proxyMiddleware = require("./proxyMiddleware");
 
module.exports = function (app) {
  proxyMiddleware && app.use(proxyMiddleware);

}