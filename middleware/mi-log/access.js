module.exports = (ctx, message, commonInfo) => {
  const { method, url, host, headers, body } = ctx.request;
  const { body: res } = ctx.response;
  const client = {
    method,
    url,
    host,
    body,
    res,
    message,
    referer: headers["referer"],
    userAgent: headers["user-agent"]
  };

  return JSON.stringify(Object.assign(commonInfo, client));
};
