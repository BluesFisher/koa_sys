const commonConfig = require("../config/kafkaConfig");
const producer = require("./kafka/producer");
const consumer = require("./kafka/consumer");

const kafka = require("kafka-node");
const client = new kafka.KafkaClient();

client.createTopics(commonConfig.testTopic, (error, result) => {
  // result is an array of any errors if a given topic could not be created
});

module.exports = {
  producer: producer(kafka, commonConfig),
  consumer: consumer(kafka, commonConfig),
};
