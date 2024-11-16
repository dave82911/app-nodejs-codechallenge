const { Kafka } = require('kafkajs');

const antiFraudRunner = module.exports;
const log4j = require('../utils/logger');
const transactionsConsumer = require('./transactionsConsumer');

const logger = log4j.getLogger('antiFraudRunner');

const {
  kafkaConfig,
  createTransactionsTopic,
  antiFraudGroupId,
} = require('../configs/kafkaConfigs');

const kafka = new Kafka(kafkaConfig);

const consumer = kafka.consumer({ groupId: antiFraudGroupId });

antiFraudRunner.run = async () => {
  logger.info('antiFraudRunner is starting');

  await consumer.connect();
  logger.info('Consumer connected');

  await consumer.subscribe({topic: createTransactionsTopic, fromBeginning: true});

  await consumer.run({
    eachMessage: transactionsConsumer.validate,
  });
};
