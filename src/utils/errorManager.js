const { fixResponseCodes, isObject } = require('./functions');

const buildThrow = (e, initialMessage) => {
  let message = initialMessage;
  let code = 500;
  let status = 500;

  if (e.status && e.code && e.message) {
    message = e.message;
    status = fixResponseCodes(e.status);
    code = e.status;
  } else if (e.statusCode && e.error && typeof e.error === 'string') {
    try {
      const error = JSON.parse(e.error);
      if (error.message) {
        message = error.message;
      } else if (error.errors && error.errors.length === 1) {
        message = error.errors[0].message;
      } else {
        message = error.status;
      }
    } catch (err) {
      message = err.error;
    }

    status = e.statusCode;
    code = e.statusCode;
  } else if (e.error && typeof e.error === 'object') {
    const error = (e.error.error && isObject(e.error.error)) ? e.error.error : e.error;

    message = error.message;
    status = e.statusCode;
    code = e.statusCode;
  }

  return { message, status, code };
};

const errorHandler = (res, e, logger, logName, message) => {
  const error = e;
  logger(logName, `${message}: ${JSON.stringify(error)}`);
  logger(logName, `${message}: ${error}`);

  const handledError = buildThrow(error, message);

  return res.status(handledError.code).json({ ...handledError, stack: e.stack });
};

module.exports = {
  errorHandler,
  buildThrow,
};
