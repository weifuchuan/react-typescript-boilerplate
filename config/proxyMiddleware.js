// @flow
import proxy from 'http-proxy-middleware'

export default undefined; 

/*
export default proxy('/api/', {
  target: "http://localhost:80",
  changeOrigin: true,
  ws: true,
  pathRewrite: function (path, req) {
    return path.substring(4); // trim left /api
  }
});
*/