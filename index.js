const bodyParser = require('body-parser');
const moment = require('moment-timezone');
const log4js = require('log4js');
const express = require('express');
const routes = require('./src/routes');

const app = express();

const {
  TIMEZONE,
  APP_NAME,
  PORT,
  LOG_LEVEL,
} = require('./config');

moment.tz.setDefault(TIMEZONE);

const logger = log4js.getLogger(APP_NAME);
logger.level = LOG_LEVEL;

process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  logger.error(reason.stack);
});

app.use(bodyParser.json());

app.use(`/api/${APP_NAME}`, routes);

app.use(log4js.connectLogger(logger, { level: 'auto' }));

app.listen(PORT);

module.exports = app;
