const {
  TRANSACTIONS,
} = require('../src/repositories/tableNames');

exports.up = (knex) => knex.schema.createTable(TRANSACTIONS, (table) => {
  table.increments('id');
  table.string('account_external_id_debit');
  table.string('account_external_id_credit');
  table.integer('transfer_type_id');
  table.integer('value');
  table.string('status');
  table.timestamps(true, true);
});

exports.down = (knex) => knex.schema.dropTable(TRANSACTIONS);
