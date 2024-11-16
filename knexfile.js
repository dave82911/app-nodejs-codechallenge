const { DB_CONFIG: dbConfig } = require('./config');

module.exports = {
  client: 'pg',
  connection: dbConfig.connection,
  migrations: {
    directory: './migrations',
    tableName: 'migrations',
  },
};
