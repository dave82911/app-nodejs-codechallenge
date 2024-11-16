const { KAFKA_HOST, KAFKA_PORT } = require('../../config');

const kafkaConfig = {
  clientId: 'code-challenge',
  brokers: [`${KAFKA_HOST}:${KAFKA_PORT}`], // Replace with your Kafka broker address
};

module.exports = {
  kafkaConfig,
  createTransactionsTopic: 'create-transaction',
  updateTransactionsTopic: 'update-transaction',
  antiFraudGroupId: 'anti-fraud',
  transactionsGroupId: 'transactions',
};
