module.exports = (ctx, message, commonInfo) => {
  const { method, url, host, headers = {}, body, ip } = ctx.request || {};
  const { body: res } = ctx.response || {};
  const client = {
    method,
    url,
    host,
    ip,
    body,
    res,
    message,
    referer: headers["referer"],
    userAgent: headers["user-agent"],
  };

  return JSON.stringify(Object.assign(commonInfo, client));
};
