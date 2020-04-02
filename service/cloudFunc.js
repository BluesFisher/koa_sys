const vm = require("vm");

module.exports = {
  findFunc: async function(ctx, name) {
    if (!name) return "";
    let sql = `select * from cloud_func where name=?`;
    const res = await ctx.app.lib.sqlQuery(sql, [name]);

    return res && res[0];
  },
  registFunc: async function(ctx, name, body) {
    let sql = `insert into cloud_func (body,name) values(?,?)`;
    if (this.findFunc(ctx, name)) {
      sql = `update cloud_func set body=? where name=?`;
    }
    await ctx.app.lib.sqlQuery(sql, [
      body || ctx.app.cloudFunc[name].handler.toString(),
      name
    ]);
  },
  excuteFunc: async function(ctx, name, args = {}) {
    const {
      config: { redisStore },
      lib,
      cloudFunc
    } = ctx.app;

    let body = await redisStore.get(`cloud_func_${name}`);
    if (!body) {
      let sql = `select * from cloud_func where name=?`;
      let res = await lib.sqlQuery(sql, [name]);
      body = (res[0] && res[0].body) || "";
      redisStore.set(body, { sid: `cloud_func_${name}` });
      console.log("excuteFunc from sql", body);
    }

    if (body) {
      const sandbox = cloudFunc.common.buildFunc(ctx, body, args);
      const data = await sandbox.promise;
      return { cloudFuncRes: data };
    }

    return "";
  }
};
