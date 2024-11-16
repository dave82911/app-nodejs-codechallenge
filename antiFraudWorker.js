const moment = require('moment-timezone');
const log4js = require('log4js');
const { TIMEZONE } = require('./config');

const consumerRunner = require('./src/consumers/antiFraudRunner');

moment.tz.setDefault(TIMEZONE);
const APP_NAME = 'anti-fraud-worker';

const logger = log4js.getLogger(APP_NAME);

process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  logger.error(reason.stack);
});

process.setMaxListeners(Infinity);
const worker = () => {
  logger.info(`Starting ${APP_NAME} kafka worker.`);
  consumerRunner.run();
};

worker();

module.exports = worker;
