module.exports = (kafka, commonConfig) => {
  const Consumer = kafka.Consumer;
  const client = new kafka.KafkaClient(commonConfig.common);
  const consumer = new Consumer(client, [...commonConfig.testTopic], {
    autoCommit: true,
  });

  consumer.on("message", function (message) {
    console.log(message);
  });

  return consumer;
};
