const { Kafka } = require('kafkajs');

const transactionsRunner = module.exports;
const log4j = require('../utils/logger');
const transactionsConsumer = require('./transactionsConsumer');

const logger = log4j.getLogger('transactionsRunner');

const {
  kafkaConfig,
  updateTransactionsTopic,
  transactionsGroupId,
} = require('../configs/kafkaConfigs');

const kafka = new Kafka(kafkaConfig);

const consumer = kafka.consumer({ groupId: transactionsGroupId });

transactionsRunner.run = async () => {
  logger.info('transactionsRunner is starting');

  await consumer.connect();
  logger.info('Consumer connected');

  await consumer.subscribe({topic: updateTransactionsTopic, fromBeginning: true});

  await consumer.run({
    eachMessage: transactionsConsumer.update,
  });
};
