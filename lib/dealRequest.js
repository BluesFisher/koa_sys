const uuid = require("uuid");
const dubbo = require("./dubbo");

const getReqParam = async ({ ctx, params, commonIn, needAuth = true }) => {
  const requestId = uuid.v4();
  const { userId = "" } = ctx.state.user || {};

  if (needAuth && !userId) {
    ctx.send({ ...ctx.app.config.errorInfo.noAuth, data: {} });
    return false;
  }

  return {
    params,
    commonIn: {
      requestId,
      userId,
      ...commonIn,
    },
  };
};

const judgeEmptyParams = (ctx, params) => {
  const keys = Object.keys(params);
  for (let i = 0, j = keys.length; i < j; i++) {
    if (params.hasOwnProperty(keys[i]) && !params[keys[i]]) {
      ctx.send({ ...ctx.app.config.errorInfo.empty, data: {} });
      return false;
    }
  }

  return true;
};

const dubboCall = async ({ ctx, service, method, params, needAuth = true }) => {
  const reqParam = await getReqParam({
    ctx,
    params,
    needAuth,
  });

  if (!reqParam) return {};

  const { res = {} } = await dubbo.service[service][method](reqParam);
  const { data, msg, code } = res || {};

  console.log(`======${service}.${method}======`, res);

  if (code !== 0) {
    ctx.send({ code: code || -1, msg: msg || "接口调用异常", data: {} });
    return {};
  }

  return res || {};
};

module.exports = { getReqParam, judgeEmptyParams, dubboCall };
