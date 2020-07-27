// const jwt = require("jsonwebtoken");
const {
  getReqParam,
  judgeEmptyParams,
  dubboCall,
} = require("../lib/dealRequest");
const dubbo = require("../lib/dubbo");

module.exports = {
  // 获取csrfToken
  getBaseInfo: async (ctx, next) => {
    console.log("getBaseInfo", ctx.state.user);

    ctx.send({ code: 0, msg: "ok", data: {} });
  },
  /**
   * @function 获取userId
   **/
  getSid: async (ctx, next) => {
    const { code } = ctx.request.body;

    if (!judgeEmptyParams(ctx, { code })) return;

    const { openId, errmsg, errcode } = await ctx.app.service.user.getOpenId({
      ctx,
      code,
    });

    if (errmsg) {
      return ctx.send({ code: errcode || -1, msg: errmsg, data: {} });
    }

    const { data, code: resCode } = await dubboCall({
      ctx,
      service: "userService",
      method: "userAuthorise",
      params: { openId },
      needAuth: false,
    });

    if (resCode !== 0) return;

    const { token } = await ctx.app.lib.saveToken(ctx, { userId: data });

    ctx.send({ code: 0, msg: "登陆成功", data: { token } });
  },
  /**
   * @function 设置用户信息
   **/
  setUserInfo: async (ctx, next) => {
    const { userName, sex, phone } = ctx.request.body;

    if (!judgeEmptyParams(ctx, { userName, sex, phone })) return;

    const { data, code } = await dubboCall({
      ctx,
      service: "userService",
      method: "setUserInfo",
      params: { userName, sex, phone },
    });

    if (code !== 0) return;

    ctx.send({ code, msg: msg || "成功", data });
  },
};
