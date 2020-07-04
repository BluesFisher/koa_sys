// const jwt = require("jsonwebtoken");
const { getReqParam } = require("../lib/dealRequest");
const dubbo = require("../lib/dubbo");

module.exports = {
  // 获取csrfToken
  getBaseInfo: async (ctx, next) => {
    ctx.send({ code: 0, message: "ok", data: {} });
  },
  /**
   * @function 获取userId
   * @param {Object} ctx.request.body
   * @param {String} ctx.request.body.code 微信获取的code
   * @returns sid
   **/
  getSid: async (ctx, next) => {
    const { code } = ctx.request.body;
    if (!code) {
      return ctx.send({ code: -1, message: "err: no code", data: {} });
    }

    const params = { openId: ctx.app.service.login.getOpenId({ code }) };
    const reqParam = getReqParam({ ctx, params, needAuth: false });

    const res = await dubbo.service.userService.userAuthorise(reqParam);

    // const { token } = await ctx.app.lib.saveToken(ctx, { phone });

    // ctx.send({ code: 0, msg: "登陆成功", data: { token } });

    console.log("=====", res);

    ctx.send({ code: 0, message: "ok", data: { ...reqParam } });
  },
};
