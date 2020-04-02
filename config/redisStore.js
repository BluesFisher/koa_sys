const Redis = require("ioredis");
const { Store } = require("koa-session2");

redisConfig = {
  port: 6379,
  host: "localhost",
  family: 4, // 4 (IPv4) or 6 (IPv6)
  password: "",
  db: 0
};

class RedisStore extends Store {
  constructor() {
    super();
    this.redis = new Redis(redisConfig);
  }

  async get(sid, ctx) {
    let data = await this.redis.get(`SESSION:${sid}`);
    return JSON.parse(data);
  }

  async set(session, { sid = this.getID(24), maxAge = 5 * 60 } = {}, ctx) {
    try {
      // Use redis set EX to automatically drop expired sessions
      await this.redis.set(
        `SESSION:${sid}`,
        JSON.stringify(session),
        "EX",
        maxAge
      );
    } catch (e) {}
    return sid;
  }

  async destroy(sid, ctx) {
    return await this.redis.del(`SESSION:${sid}`);
  }
}

module.exports = new RedisStore();
