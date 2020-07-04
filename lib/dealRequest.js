const uuid = require("uuid");

const getReqParam = ({ ctx, params, commonIn, needAuth = true }) => {
  const requestId = uuid.v4();
  const { sid } = ctx.request.header;

  if (needAuth && (!sid || !ctx.session.sid)) return "";

  const { userId = "" } = ctx.session.sid || {};

  return {
    params,
    commonIn: {
      requestId,
      userId,
    },
  };
};

module.exports = { getReqParam };
