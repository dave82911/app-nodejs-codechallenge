const transactionsController = module.exports;

const TransactionsService = require('../services/transactionsService');
const { validSchema } = require('../utils/functions');
const { errorHandler } = require('../utils/errorManager');
const {
  createTransaction,
} = require('../schemas/transactionsSchema');

const logName = 'transactionsController: ';

transactionsController.create = async (req, res) => {
  const logger = console.log;

  try {
    const options = { logger: logger.bind(logger, logName) };
    const transaction = req.body;
    logger(logName, `..executing: create with params ${JSON.stringify(transaction)}`);

    await validSchema(createTransaction, transaction);
    const response = await TransactionsService.create(transaction, options);

    return res.send(response);
  } catch (e) {
    return errorHandler(res, e, logger, logName, 'Could not create transaction');
  }
};

transactionsController.findById = async (req, res) => {
  const logger = console.log;

  try {
    const options = { logger: logger.bind(logger, logName) };
    const { id } = req.params;
    logger(logName, '..executing: findById');

    const response = await TransactionsService.findById(id, options);

    return res.send(response);
  } catch (e) {
    return errorHandler(res, e, logger, logName, 'Could not find transaction by id');
  }
};
