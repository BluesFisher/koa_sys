module.exports = {
  login: async function(ctx, phone, password) {
    let res = await ctx.app.lib.sqlQuery(ctx.app.dao.usersDao.login, [
      phone,
      password
    ]);

    ctx.app.lib.kafka.producer.sendMsg([
      { topic: "login", partition: 0, messages: "login again" + new Date() }
    ]);

    if (
      res.length === 1 &&
      res[0].phone === phone &&
      res[0].password === password
    ) {
      return true;
    } else {
      return false;
    }
  },

  findUser: async function(ctx, phone, password) {
    let res = await ctx.app.lib.sqlQuery(ctx.app.dao.usersDao.queryByPhone, [
      phone
    ]);

    return res.length !== 0;
  },

  register: async function(ctx, phone, password) {
    if (await this.findUser(ctx, phone, password)) {
      return { code: 202, msg: "用户已存在" };
    }

    let sql = `insert into users (phone,password) values ('${phone}','${password}')`;
    let res = await ctx.app.lib.sqlQuery(sql);

    if (res.affectedRows === 1) {
      return { code: 0, msg: "注册成功" };
    } else {
      return { code: 0, msg: "注册失败" };
    }
  }
};
