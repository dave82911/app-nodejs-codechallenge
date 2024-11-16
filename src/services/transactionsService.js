const transactionsService = module.exports;

const transactionProducer = require('../producers/transactionProducer');

const transactionsRepository = require('../repositories/transactionsRepository');

const logName = 'transactionsService: ';

transactionsService.create = async (transaction = {}, options = {}) => {
  const { logger } = options;
  logger(logName, `create transaction: ${JSON.stringify(transaction)}`);

  const {
    accountExternalIdDebit,
    accountExternalIdCredit,
    transferTypeId,
    value,
  } = transaction;

  const insertedTransaction = await transactionsRepository.insert({
    account_external_id_debit: accountExternalIdDebit,
    account_external_id_credit: accountExternalIdCredit,
    transfer_type_id: transferTypeId,
    value,
    status: 'pending',
  });

  await transactionProducer.validateTransaction(insertedTransaction, options);

  return insertedTransaction;
};

transactionsService.findById = async (transactionId, options = {}) => {
  const { logger } = options;
  logger(logName, `findById: ${transactionId}`);

  return transactionsRepository.findById(transactionId, options);
};

transactionsService.update = async (transaction, options = {}) => {
  const { logger } = options;
  logger.info(`${logName} update transaction: ${transaction}`);

  const {
    id,
    ...data
  } = transaction;

  return transactionsRepository.update(id, data);
};
