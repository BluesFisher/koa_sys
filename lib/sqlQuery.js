const mysql = require("mysql");
const DBConfig = require("../config/DBConfig");

/*建立连接池*/
let pool = mysql.createPool(DBConfig);

/*连接数据库*/
let sqlQuery = (sql, params, succCb, errCb) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log("sqlQuery", err);
        errCb && errCb();
        reject(err);
      } else {
        console.log("数据库连接成功", sql, params);

        connection.query(sql, params, (err, row) => {
          if (err) {
            errCb && errCb();
            reject(err);
          } else {
            succCb && succCb();
            resolve(row);
          }
          connection.release();
        });
      }
    });
  });
};

module.exports = sqlQuery;
