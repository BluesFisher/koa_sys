const path = require("path");
const ip = require("ip");
const bodyParser = require("koa-bodyparser");
const nunjucks = require("koa-nunjucks-2");
const staticFiles = require("koa-static");
const miSend = require("./mi-send");
const miLog = require("./mi-log");
const miHttpError = require("./mi-http-error");
const miRule = require("./mi-rule");
const miSession = require("./mi-session");
const miJwt = require("./mi-jwt");
const miJwtCatch = require("./mi-jwt/catch");
const miJwtRefresh = require("./mi-jwt/refresh");
const miCors = require("./mi-cors");
const miCsrf = require("./mi-csrf");
const miGraphql = require("./mi-graphql");

module.exports = app => {
  miRule({
    app,
    rules: [
      {
        //指定controller文件夹下的js文件，挂载在app.controller属性
        folder: path.join(__dirname, "../controller"),
        name: "controller"
      },
      {
        // 指定service文件夹下的js文件，挂载在app.service属性
        folder: path.join(__dirname, "../service"),
        name: "service"
      },
      {
        // 指定config文件夹下的js文件，挂载在app.config
        folder: path.join(__dirname, "../config"),
        name: "config"
      },
      {
        // 指定lib文件夹下的js文件，挂载在app.lib
        folder: path.join(__dirname, "../lib"),
        name: "lib"
      },
      {
        // 指定dao文件夹下的js文件，挂载在app.dao
        folder: path.join(__dirname, "../dao"),
        name: "dao"
      },
      {
        // 指定cloudFunc文件夹下的js文件，挂载在app.cloudFunc
        folder: path.join(__dirname, "../cloudFunc"),
        name: "cloudFunc"
      }
    ]
  });

  app.use(miCors());
  app.use(miSend());
  app.use(miGraphql(app));
  app.use(miSession(app));
  app.use(miCsrf(app));

  app.use(miJwtCatch(app));
  app.use(miJwt(app));
  app.use(miJwtRefresh(app));

  app.use(
    miHttpError({
      errorPageFolder: path.resolve(__dirname, "../errorPage")
    })
  );
  app.use(
    miLog({
      env: app.env,
      projectName: "koa2-tutorial",
      appLogLevel: "debug",
      dir: "logs",
      serverIp: ip.address()
    })
  );
  app.use(staticFiles(path.resolve(__dirname, "../public")));
  app.use(
    nunjucks({
      ext: "html",
      path: path.join(__dirname, "../views"),
      nunjucksConfig: {
        trimBlocks: true
      }
    })
  );
  app.use(bodyParser());
};
