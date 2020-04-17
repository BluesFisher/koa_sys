const RateLimit = require("koa2-ratelimit").RateLimit;
// https://cnpmjs.org/package/koa2-ratelimit

module.exports = function (app) {
  return RateLimit.middleware({
    interval: { min: 15 }, // 15 minutes = 15*60*1000
    max: 100, // limit each IP to 100 requests per interval
    delayAfter: 100, // begin slowing down responses after the first request
    timeWait: 3 * 1000, // slow down subsequent responses by 3 seconds per request
    // prefixKey: "get/", // to allow the bdd to Differentiate the endpoint
    whitelist: [], // Array of whitelisted IPs to not be rate limited.
    getUserId: async function (ctx) {
      const whereFinds = [
        ctx.state.user,
        ctx.user,
        ctx.state.User,
        ctx.User,
        ctx.state,
        ctx,
      ];
      const toFinds = ["id", "userId", "user_id", "idUser", "id_user"];
      for (const whereFind of whereFinds) {
        if (whereFind) {
          for (const toFind of toFinds) {
            if (whereFind[toFind]) {
              return whereFind[toFind];
            }
          }
        }
      }
      return null;
    },
    keyGenerator: async function (ctx) {
      const userId = await this.getUserId(ctx);
      let key = `${this.prefixKey}|${ctx.request.ip}`;
      if (userId) {
        key = `${this.prefixKey}|${userId}`;
      }
      ctx.log.warn({ key: "rate-limit", userId: key });

      return key;
    },
    skip: async function (/*ctx*/) {
      //  Function used to skip requests. Returning true from the function will skip limiting for that request
      return false;
    },
  });
};
