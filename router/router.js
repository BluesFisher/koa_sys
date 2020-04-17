const router = require("koa-router")();

module.exports = (app) => {
  router.post("/cloudFunc/registFunc", app.controller.cloudFunc.registFunc);
  router.post("/cloudFunc/excuteFunc", app.controller.cloudFunc.excuteFunc);

  router.get("/getBaseInfo", app.controller.login.getBaseInfo);
  router.post("/user/register", app.controller.login.register);
  router.post(
    "/user/loginWithPassword",
    app.controller.login.loginWithPassword
  );
  router.post("/user/getUserInfo", app.controller.login.getUserInfo);

  router.post("/log/getLogItem", app.controller.logInfo.getLogItem);

  app.use(router.routes()).use(router.allowedMethods());
};
