const HttpStatus = require('http-status-codes');
const validSchema = async (schema, data) => {
  try {
    await schema.validateAsync(data);

    return 'Is Valid';
  } catch (e) {
    throw { message: e.message, status: 400, code: 400 };
  }
};

function fixResponseCodes(code) {
  let fixCode;

  switch (code) {
    case 'UNAUTHORIZED':
    case 'Unauthorized':
    case 401:
      fixCode = HttpStatus.UNAUTHORIZED;
      break;

    case 'FORBIDDEN':
    case 'Forbidden':
    case 403:
      fixCode = HttpStatus.FORBIDDEN;
      break;

    case 'NOT_FOUND':
    case 404:
      fixCode = HttpStatus.NOT_FOUND;
      break;

    case 409:
    case 'CONFLICT':
      fixCode = HttpStatus.CONFLICT;
      break;

    case undefined:
    case 500:
      fixCode = HttpStatus.INTERNAL_SERVER_ERROR;
      break;

    case 415:
      fixCode = HttpStatus.UNSUPPORTED_MEDIA_TYPE;
      break;

    case 'BAD_REQUEST':
    case 400:
    default:
      fixCode = HttpStatus.BAD_REQUEST;
  }

  return fixCode;
}

const isObject = (a) => (!!a) && (a.constructor === Object);

module.exports = {
  validSchema,
  fixResponseCodes,
  isObject,
};
