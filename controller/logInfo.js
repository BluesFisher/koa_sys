module.exports = {
  getLogItem: async (ctx, next) => {
    let { id } = ctx.request.body;
    let res = await ctx.app.lib.sqlQuery(
      "select * from t_node_log where id=?",
      [id || 0]
    );
    if (res.length === 1) {
      ctx.send({ code: 0, message: "success", data: res[0] });
    } else {
      ctx.send({ code: -1, message: "failed", data: res[0] });
    }
  },
};
