const jwt = require("jsonwebtoken");

module.exports = {
  loginWithPassword: async (ctx, next) => {
    let { phone, password } = ctx.request.body;
    console.log("loginWithPassword", phone, password);

    if (phone && password) {
      let login = await ctx.app.service.login.login(ctx, phone, password);

      if (login) {
        const { token } = await ctx.app.lib.saveToken(ctx, { phone });

        ctx.send({ code: 0, msg: "登陆成功", data: { token } });
        return;
      }
    }

    ctx.send({ code: 0, msg: "登陆失败", data: {} });
  },

  register: async (ctx, next) => {
    let { phone, password } = ctx.request.body;
    console.log("register", phone, password);

    let data = await ctx.app.service.login.register(ctx, phone, password);

    ctx.send(data);
  },

  getUserInfo: async (ctx, next) => {
    const token = ctx.header.authorization;

    const { sid } = ctx.state.user;

    // 有jwt，且jwt中有sid，并且能从redis拿到sid对应的信息，则认为已登陆
    if (sid) {
      let user = sid ? await ctx.app.config.redisStore.get(sid) : {};
      console.log("getUserInfo", user, sid);

      if (user) {
        ctx.send({ code: 0, message: "已登陆", data: { user } });
        return;
      }
    }

    // token 过期或无效
    ctx.status = 401;
    ctx.body = { code: 401, msg: "未登陆", data: {} };
    return;
  },

  getBaseInfo: async (ctx, next) => {
    ctx.send({ code: 0, message: "ok", data: {} });
  }
};
