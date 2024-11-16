const transactionsConsumer = module.exports;

const log4j = require('../utils/logger');
const { validSchema } = require('../utils/functions');

const {
  TRANSACTION_VALUE,
  AVAILABLE_STATUS,
} = require('../../config');

const {
  validateTransaction,
} = require('../schemas/transactionsSchema');

const transactionProducer = require('../producers/transactionProducer');

const transactionsService = require('../services/transactionsService');

const APP_NAME = 'transactions-consumer';
const logger = log4j.getLogger(APP_NAME);

transactionsConsumer.validate = async ({topic, partition, message}) => {
  logger.info({
    topic,
    partition,
    offset: message.offset,
    value: message.value.toString(),
  });

  try {
    // First validate the content of the object, it must contain the transaction keys
    const transaction = JSON.parse(message.value)[0];
    await validSchema(validateTransaction, transaction);

    const {
      value, status,
    } = transaction;

    // Validate if transaction has status "pending"
    if (status !== AVAILABLE_STATUS.pending) {
      logger.info('The transaction does not have a pending status: ', JSON.stringify(transaction));

      return Promise.resolve(true);
    }

    if (value > TRANSACTION_VALUE) {
      transaction.status = AVAILABLE_STATUS.rejected;
      logger.info('Sending kafka message with invalid status for transaction: ', JSON.stringify(transaction));
    } else {
      transaction.status = AVAILABLE_STATUS.approved;
      logger.info('Sending kafka message with valid status for transaction: ', JSON.stringify(transaction));
    }

    return transactionProducer.updateTransaction(transaction, { logger });
  } catch (e) {
    logger.error('Error validating transaction: ', e.message);
  }
};


transactionsConsumer.update = async ({topic, partition, message}) => {
  logger.info({
    topic,
    partition,
    offset: message.offset,
    value: message.value.toString(),
  });

  try {
    // First validate the content of the object, it must contain the transaction keys
    const transaction = JSON.parse(message.value);
    await validSchema(validateTransaction, transaction);

    logger.info('Trying to update the transaction: ', JSON.stringify(transaction));

    return transactionsService.update(transaction, { logger });
  } catch (e) {
    logger.error('Error updating transaction: ', e.message);
  }
};
