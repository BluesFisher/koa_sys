module.exports = app => (ctx, next) =>
  next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = { code: 401, msg: "未登陆", data: {} };
    } else {
      throw err;
    }
  });
