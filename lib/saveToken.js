const jwt = require("jsonwebtoken");

module.exports = async (ctx, user) => {
  const {
    secret,
    expiresIn,
    cookieParams,
    sidMaxAge
  } = ctx.app.config.jwtConfig;

  // sso 存储登陆态
  const { maxAge, httpOnly, domain } = cookieParams;
  const sid = await ctx.app.config.redisStore.set(user, { maxAge: sidMaxAge });
  const token = jwt.sign({ ...user, sid }, secret, { expiresIn });
  ctx.cookies.set("token", token, { maxAge, httpOnly, domain });

  return { sid, token };
};
