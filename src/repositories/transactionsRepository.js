const transactionsRepository = module.exports;

const { TRANSACTIONS } = require('./tableNames');
const connection = require('../utils/dbConnector');

const defaultColumns = [
  `${TRANSACTIONS}.id`,
  `${TRANSACTIONS}.account_external_id_debit`,
  `${TRANSACTIONS}.account_external_id_credit`,
  `${TRANSACTIONS}.transfer_type_id`,
  `${TRANSACTIONS}.value`,
  `${TRANSACTIONS}.status`,
  `${TRANSACTIONS}.created_at`,
  `${TRANSACTIONS}.updated_at`,
];

transactionsRepository.insert = async (data) => connection.transaction(async (trx) => {
  return trx(TRANSACTIONS)
    .insert(data)
    .returning(defaultColumns);
});

transactionsRepository.findById = async (transactionId) => connection(TRANSACTIONS)
  .select(defaultColumns)
  .where({ id: transactionId })
  .first();

transactionsRepository.update = async (id, data) => connection.transaction(async (trx) => {
  return trx(TRANSACTIONS)
    .update(data)
    .where({ id })
    .returning(defaultColumns);
});