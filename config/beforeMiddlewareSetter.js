// @ts-nocheck 
 
module.exports = function (app) {
  app.get("/login", (req, resp)=>{
    resp.end("login"); 
  });
}