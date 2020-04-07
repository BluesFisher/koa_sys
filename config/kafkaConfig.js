module.exports = {
  common: {
    kafkaHost: "localhost:9092,localhost:9093",
  },
  testTopic: [
    {
      topic: "my-topic",
      partitions: 1,
      replicationFactor: 1,
    },
    {
      topic: "login",
      partitions: 1,
      replicationFactor: 1,
    },
  ],
};
