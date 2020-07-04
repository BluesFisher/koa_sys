// 调用接口时在header中带上csrf-token

const CSRF = require("koa-csrf");

const URL_WHITELIST = ["/log/getLogItem"];

module.exports = (app) => {
  app.use(
    new CSRF({
      invalidTokenMessage: "Invalid CSRF token",
      invalidTokenStatusCode: 403,
      excludedMethods: ["GET", "HEAD", "OPTIONS"],
      disableQuery: false,
    })
  );

  return async (ctx, next) => {
    if (!["GET", "POST"].includes(ctx.method)) return next();

    if (ctx.method === "GET" && ctx.url === "/getBaseInfo") {
      ctx.send({ code: 0, data: { csrfToken: ctx.csrf } });
      return;
    }

    await next();
  };
};
