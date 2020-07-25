const request = require("request");

module.exports = {
  // 通过code获取用户openId
  getOpenId: ({ ctx, code }) => {
    return new Promise((resolve, reject) => {
      if (!code) return resolve({ openId: "", errmsg: "code valid" });
      const { appId, appSecret } = ctx.app.config.miniApp;
      console.log("getOpenId: ", appId, appSecret);

      const wxUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${appId}&secret=${appSecret}&js_code=${code}&grant_type=authorization_code`;
      request(wxUrl, (err, res, data) => {
        if (!err && res.statusCode == 200) {
          const { openid, errcode, errmsg } = JSON.parse(res.body || "{}");

          console.log("getOpenId success: ", openid, errcode, errmsg);

          if (errcode) {
            resolve({ openId: "", errmsg, errcode });
          }

          resolve({ openId: openid });
        } else {
          console.log("getOpenId err: ", err);

          resolve({ openId: "", errmsg: "request err" });
        }
      });
    });
  },
};
