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
  cloud_func: `create table if not exists cloud_func(id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, name VARCHAR(20) NOT NULL, body varchar(21000) not null);`,
};

const databases = {
  myDb:
    "create DATABASE IF NOT EXISTS my_db DEFAULT CHARSET utf8 COLLATE utf8_general_ci;",
};

/*数据库默认配置*/
module.exports = {
  database: "my_db", //数据库名称
  user: "root", //mysql用户名
  password: "root", //mysql密码
  PORT: "3306", //mysql端口号
  host: "127.0.0.1", //服务器ip
  tables,
  databases,
};
