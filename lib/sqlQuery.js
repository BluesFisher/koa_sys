const mysql = require("mysql");
const dBConfig = require("../config/dBConfig");

/*建立连接池*/
let pool = mysql.createPool(dBConfig);

/*连接数据库*/
let sqlQuery = (sql, params, succCb, errCb) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        console.log("sqlQuery", err, sql, params);
        errCb && errCb();
        reject(err);
      } else {
        console.log("数据库连接成功", params);

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

const createDatabase = () => {
  sqlQuery(
    dBConfig.databases.myDb,
    {},
    (res) => {
      console.log("建库成功");
      return true;
    },
    (err) => {
      console.log("建库失败", err);
      return false;
    }
  );
};

const createTable = () => {
  for (let key in dBConfig.tables) {
    if (dBConfig.tables.hasOwnProperty(key)) {
      sqlQuery(
        dBConfig.tables[key],
        {},
        (res) => {
          console.log("建表成功", key);
          return true;
        },
        (err) => {
          console.log("建表失败", key, err);
          return false;
        }
      );
    }
  }
};

createDatabase();
createTable();

module.exports = sqlQuery;
