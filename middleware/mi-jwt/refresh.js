const jwt = require("jsonwebtoken");
const moment = require("moment");

// 自动刷新token
module.exports = app => async (ctx, next) => {
  const {
    secret,
    refreshDiffMinutes,
    cookieParams,
    sidMaxAge,
    expiresIn,
    filterPath
  } = app.config.jwtConfig;

  if (
    filterPath.reduce((result, item) => result || item.test(ctx.url), false)
  ) {
    await next();
    return;
  }

  const { exp, sid } = ctx.state.user;
  if (!exp || !sid) {
    ctx.status = 401;
    ctx.body = { code: 401, msg: "未登陆", data: {} };
    return;
  }

  const diffMinutes = moment.unix(exp || 0).diff(moment(), "minute");

  const user = await app.config.redisStore.get(sid || "");
  console.log("refresh: ", exp, diffMinutes, sid, user);
  // 如果sid已过期
  if (!user) {
    ctx.status = 401;
    ctx.body = { code: 401, msg: "未登陆", data: {} };
    return;
  }

  // 如果未来5min内token过期
  if (diffMinutes < refreshDiffMinutes) {
    await app.config.redisStore.destroy(sid);
    const newSid = await ctx.app.lib.saveToken(ctx, user);
    ctx.state.user.sid = newSid;
  }

  await next();
};
