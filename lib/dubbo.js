/*
 *   const dubbo = require('./dubbo')
 *   const res = await dubbo.service.dubboService.Hello(who)
 */

const { Dubbo, java, setting } = require("dubbo2.js");
const interfaceName = ["com.dubbo.learn.dubbo.TestProviderService"];
const interfaceVersion = "1.0.0";

const dubboSetting = setting.match(interfaceName, {
  version: interfaceVersion,
});
const dubboService = (dubbo) =>
  dubbo.proxyService({
    dubboInterface: "com.dubbo.learn.dubbo.TestProviderService",
    timeout: 3,
    // attachments: {}, // package未开放
    methods: {
      Hello(who) {
        //仅仅做参数hessian化转换
        return [java.String(who)];
      },
    },
  });

// 实例化Dubbo， 入参主要是名称和 dubbo 接口的设置
const dubbo = new Dubbo({
  application: { name: "dubbo-node-test" },
  register: "127.0.0.1:2181",
  dubboSetting,
  service: { dubboService },
  //   dubboInvokeTimeout: 5, // dubbo的默认调用超时时间,单位是秒
  //   dubboSocketPool: 1, // socket池数量
});

module.exports = dubbo;
