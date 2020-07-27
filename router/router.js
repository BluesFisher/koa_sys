const router = require("koa-router")();

module.exports = (app) => {
  router.get("/getBaseInfo", app.controller.user.getBaseInfo);
  router.post("/getSid", app.controller.user.getSid);
  router.post("/setUserInfo", app.controller.user.setUserInfo);

  app.use(router.routes()).use(router.allowedMethods());
};
