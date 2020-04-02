// CRUD SQL语句
const users = {
  insert:
    "insert into users (username,userage,address,phone,password) values(?,?,?,?,?)",
  updatePassword: "update users set password=? where phone=?",
  updateUsername: "update users set username=? where phone=?",
  delete: "delete from users where phone=?",
  queryByPhone: "select * from users where phone=?",
  queryAll: "select * from users",
  login: "select * from users where phone=? and password=?"
};

module.exports = users;
