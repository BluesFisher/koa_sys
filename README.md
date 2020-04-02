# Koa 后台
#### 采用mvc架构，具备sso、消息系统、日志系统、数据库操作、缓存等功能，支持RESTful、graphQl等接口风格，支持跨域访问，能防止csrf攻击、支持构建云函数

- 集成redis，相关配置位于/config/redisStore.js
- 集成mysql，相关配置位于/config/jwtConfig.js
- 集成kafka，相关配置位于/config/kafkaConfig.js
- 集成jwt，以及sso和refresh token功能，相关配置位于/config/jwtConfig.js
- 集成cors、csrf功能，中间件mi-cors、mi-csrf
- 集成log4js，中间件mi-log
- 集成graphQl，中间件mi-graphql，相关配置位于/graphql
- 集成云函数构建功能，相关配置位于/cloudFunc