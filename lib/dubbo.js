/*
 *   const dubbo = require('./dubbo')
 *   const res = await dubbo.service.dubboService.Hello(who)
 */

const { Dubbo, java, setting } = require("dubbo2.js");
const dubboPath = "com.yuqi.education";
const interfaceName = [`${dubboPath}.service.UserService`];
const interfaceVersion = "0.0.1";

const dubboSetting = setting.match(interfaceName, {
  version: interfaceVersion,
});
const userService = (dubbo) =>
  dubbo.proxyService({
    dubboInterface: interfaceName[0],
    timeout: 3, // s
    // attachments: {}, // package未开放
    methods: {
      userAuthorise(params) {
        console.log("[dubbo] userService-userAuthorise: ", params);
        // [ { '$class': 'com.yuqi.education.common.CommonRequest','$': { params: [Object], commonIn: [Object] } } ]
        return [java.combine(`${dubboPath}.common.CommonRequest`, params)];
      },
      queryByOpenId() {
        return [java.String("params")];
      },
    },
  });

// 实例化Dubbo， 入参主要是名称和 dubbo 接口的设置
const dubbo = new Dubbo({
  application: { name: "eduprovider" },
  register: "172.20.10.7:2181", // "172.20.10.7:2181", "127.0.0.1:2181"
  dubboSetting,
  service: { userService },
  //   dubboInvokeTimeout: 5, // dubbo的默认调用超时时间,单位是秒
  //   dubboSocketPool: 1, // socket池数量
});

module.exports = dubbo;
