const commonConfig = require("../../config/kafkaConfig");
const kafka = require("kafka-node");

const Producer = kafka.Producer;
const client = new kafka.KafkaClient(commonConfig.common);
const producer = new Producer(client);

producer.on("ready", function() {
  console.log("kafka producer ready");
});

producer.on("error", function(err) {
  console.log("kafka producer error: ", err);
});

producer.sendMsg = (
  payloads = [
    { ...commonConfig.testTopic[0], messages: "hi_from_node" + new Date() }
  ]
) => {
  if (typeof payloads === "string") {
    payloads = [
      { ...commonConfig.testTopic[0], messages: `${payloads} ${new Date()}` }
    ];
  }
  producer.send(payloads, (err, data) => {
    console.log("producer sendMsg: ", err, data);
  });
};

module.exports = producer;
