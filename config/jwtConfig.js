module.exports = {
  secret: "jwtSecret",
  expiresIn: "1h", // token在服务端缓存时间
  refreshDiffMinutes: 5, // 刷新token，token到期前5min
  sidMaxAge: 2 * 60 * 60, // 用户信息缓存2h
  cookieParams: {
    maxAge: 60 * 60 * 1000, // token在客户端缓存1h，大于等于expiresIn即可
    httpOnly: false,
    domain: "cas.test.com",
  },
  filterPath: [
    /^\/user\/loginWithPassword/,
    /^\/user\/register/,
    /^\/getBaseInfo/,
    /^\/cloudFunc+/,
    /^\/log\/getLogItem/,
  ],
};
