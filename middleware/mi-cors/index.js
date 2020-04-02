const cors = require("koa2-cors");

module.exports = () => {
  return cors({
    credentials: true
  });
};
