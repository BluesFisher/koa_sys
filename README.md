# Koa 后台
#### 采用mvc架构，具备sso、消息系统、日志系统、数据库操作、缓存等功能，支持RESTful、graphQl等接口风格，支持跨域访问，能防止csrf攻击、支持构建云函数

- 集成redis，相关配置位于/config/redisStore.js
- 集成mysql，相关配置位于/config/dBconfig.js
- 集成kafka，相关配置位于/config/kafkaConfig.js
- 集成jwt，以及sso和refresh token功能，相关配置位于/config/jwtConfig.js
- 集成cors、csrf功能，中间件mi-cors、mi-csrf
- 集成log4js，中间件mi-log
- 集成graphQl，中间件mi-graphql，相关配置位于/graphql
- 集成云函数构建功能，相关配置位于/cloudFunc

#### 环境准备及构建
```
# 测试sso，新增hosts
$ mac /etc/hosts 增加 *.test.com 的多域名映射到127.0.0.1

# 前端sso测试代码路径
$ https://github.com/BluesFisher/koa_front.git

# 本地开发环境
$ nodemon app.js
默认访问地址：http://[*].test.com:8080

# 打包
$ npm run prod
```

#### kafka环境
```
# 默认topic：my-topic、login
# 本地启动zookeeper，默认2181端口
$ bin/zookeeper-server-start.sh config/zookeeper.properties

# 本地启动kafka broker，默认9092端口
$ bin/kafka-server-start.sh config/server.properties

# 供测试，启动consumer，登陆时会发送消息
$ bin/kafka-console-consumer.sh --bootstrap-server localhost:9092 --from-beginning --topic login

# 供测试，启动producer，监听消息
$ bin/kafka-console-producer.sh --broker-list localhost:9092 --topic login
```

#### redis环境
```
# 本地启动redis，默认6379端口
$ redis-server start

# 启动cli查看缓存, [SESSION:]开头的为代码缓存
$ redis-cli
```

#### mysql环境
```
# 默认3306端口，用户名密码默认为root，启动代码即创建数据库my_db，数据表users、cloud_func
```

