module.exports = {
  getLogItem: async (ctx, next) => {
    let { id } = ctx.request.body;
    let res = await ctx.app.lib.sqlQuery(
      //   "select * from t_node_log where id=?",
      "select * FROM t_node_log where `date` between '2020-03-30 19:43:57' and '2020-03-30 20:21:38'"
    );
    if (res.length >= 1) {
      ctx.send({ code: 0, message: "success", data: res });
      return;
    } else {
      ctx.send({ code: -1, message: "failed", data: res });
    }
  },
};
