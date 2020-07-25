// const jwt = require("jsonwebtoken");
const { getReqParam } = require("../lib/dealRequest");
const dubbo = require("../lib/dubbo");

module.exports = {
  // 获取csrfToken
  getBaseInfo: async (ctx, next) => {
    console.log("getBaseInfo", ctx.state.user);

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

    const { openId, errmsg, errcode } = await ctx.app.service.login.getOpenId({
      ctx,
      code,
    });

    if (errmsg) {
      return ctx.send({ mod: "", code: errcode || -1, msg: errmsg, data: {} });
    }

    const reqParam = getReqParam({ ctx, params: { openId }, needAuth: false });
    const { res = {} } = await dubbo.service.userService.userAuthorise(
      reqParam
    );
    const { data, msg, code: resCode, mod } = res || {};

    if (resCode !== 0) {
      return ctx.send({ mod, code: resCode, msg: msg || "暂无权限", data: {} });
    }

    const { token } = await ctx.app.lib.saveToken(ctx, { userId: data });

    console.log("=====", res, token);

    ctx.send({ code: 0, msg: "登陆成功", data: { token } });

    // ctx.send(res);
  },
};
