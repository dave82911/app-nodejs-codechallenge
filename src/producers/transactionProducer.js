const transactionProducer = module.exports;
const { Kafka } = require('kafkajs');

const {
  kafkaConfig,
  createTransactionsTopic,
  updateTransactionsTopic,
} = require('../configs/kafkaConfigs');

const kafka = new Kafka(kafkaConfig);

const producer = kafka.producer();

const logName = 'transactionProducer: ';

transactionProducer.validateTransaction = async (transaction = {}, options = {}) => {
  const { logger } = options;
  logger(logName, `Try to send kafka message with params: ${JSON.stringify(transaction)}`);

  await producer.connect();

  try {
    await producer.send({
      topic: createTransactionsTopic, // Replace with your Kafka topic
      messages: [{ value: JSON.stringify(transaction) }],
    });

    logger(logName, 'Message sent successfully!');
  } catch (error) {
    logger(logName, `Failed to send message: ${error}`);
  } finally {
    await producer.disconnect();
  }
};

transactionProducer.updateTransaction = async (transaction = {}, options = {}) => {
  const { logger } = options;
  logger.info(`${logName}, Try to send kafka message with params: ${JSON.stringify(transaction)}`);

  await producer.connect();

  try {
    await producer.send({
      topic: updateTransactionsTopic, // Replace with your Kafka topic
      messages: [{ value: JSON.stringify(transaction) }],
    });

    logger.info(`${logName} Message sent successfully!`);
  } catch (error) {
    logger.info(`${logName} Failed to send message: ${error}`);
  } finally {
    await producer.disconnect();
  }
};
