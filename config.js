const {
  TIMEZONE = 'America/Mexico_City',
  PORT = 3000,
  DATABASE_HOST= 'localhost',
  DATABASE_USER= 'postgres',
  DATABASE_PASSWORD= 'postgres',
  DATABASE_NAME= 'transactions',
  LOG_LEVEL = 'ALL',
  KAFKA_HOST = 'localhost',
  KAFKA_PORT = '9092',
  APP_NAME= 'transactions',
  TRANSACTION_VALUE= 1000,
} = process.env;

const timeout = 5000;

const databaseConfig = {
  client: 'pg',
  pool: {
    min: 1,
    max: 10,
    afterCreate: function afterPoolCreate(con, cb) {
      con.query(`SET timezone = '${TIMEZONE}';`, (err) => {
        cb(err, con);
      });
    },
    idleTimeoutMillis: timeout,
    createTimeoutMillis: timeout,
    acquireTimeoutMillis: timeout,
  },
  acquireConnectionTimeout: timeout,
  connectionTimeout: timeout,
};

const connection = {
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,
  port: 5432,
};

const AVAILABLE_STATUS = {
  pending: 'pending',
  approved: 'approved',
  rejected: 'rejected',
};

module.exports = {
  TIMEZONE,
  DATABASE_NAME,
  DB_CONFIG: {
    ...databaseConfig,
    connection,
  },
  APP_NAME,
  PORT,
  LOG_LEVEL,
  KAFKA_HOST,
  KAFKA_PORT,
  TRANSACTION_VALUE,
  AVAILABLE_STATUS,
};
