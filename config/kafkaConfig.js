module.exports = {
  common: {
    kafkaHost: "localhost:9092,localhost:9093"
  },
  testTopic: [
    {
      topic: "my-topic",
      partition: 0
    },
    {
      topic: "login",
      partition: 0
    }
  ]
};
