const knex = require('knex');
const { DB_CONFIG } = require('../../config');

const connection = knex(DB_CONFIG);

module.exports = connection;
