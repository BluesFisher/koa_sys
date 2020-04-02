const jwt = require("koa-jwt");

module.exports = app => {
  const { secret, filterPath } = app.config.jwtConfig;

  return jwt({ secret }).unless({ path: filterPath });
};
