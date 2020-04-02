const sqlQuery = require("../lib/mysql");

const tables = {
  //用户表
  users: `create table if not exists users(
   id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(20) NOT NULL,
   phone CHAR(11) NOT NULL,
   password VARCHAR(20) NOT NULL,
   avator VARCHAR(255) DEFAULT 'default.jpg',
   credit INT NOT NULL DEFAULT 0 ,
   useCredit INT NOT NULL DEFAULT 0 ,
   cash INT NOT NULL DEFAULT 0 ,
   isReal TINYINT NOT NULL DEFAULT 0
  );`,
  cloud_func: `create table if not exists cloud_func(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20) NOT NULL, body varchar(21000) not null);`
};

const createTable = (tabName, sql) => {
  sqlQuery(
    sql,
    res => {
      console.log("建表成功", tabName);
      return true;
    },
    err => {
      console.log("建表失败", tabName, err);
      return false;
    }
  );
};

for (let key in tables) {
  if (tables.hasOwnProperty(key)) {
    createTable(key, tables[key]);
  }
}
