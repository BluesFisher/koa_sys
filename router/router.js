const router = require("koa-router")();

module.exports = (app) => {
  router.get("/getBaseInfo", app.controller.login.getBaseInfo);
  router.post("/getSid", app.controller.login.getSid);

  app.use(router.routes()).use(router.allowedMethods());
};
