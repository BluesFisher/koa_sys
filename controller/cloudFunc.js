module.exports = {
  registFunc: async (ctx, next) => {
    let { name, body } = ctx.request.body;

    if (!name) ctx.send({ code: -1, message: "empty params" });

    await ctx.app.service.cloudFunc.registFunc(ctx, name, body);
    ctx.send({ code: 0, message: "success" });
  },
  excuteFunc: async (ctx, next) => {
    let { name, args } = ctx.request.body;

    if (!name) ctx.send({ code: -1, message: "empty params" });

    const res = await ctx.app.service.cloudFunc.excuteFunc(ctx, name, args);
    ctx.send({
      code: res ? 0 : -1,
      message: res ? "success" : "fail",
      data: res
    });
  }
};
