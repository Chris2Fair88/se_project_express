const ERROR_MESSAGES = {
  BAD_REQUEST: {
    status: 400,
    message: 'Bad Request',
  },

  NOT_FOUND: {
    status: 404,
    message: 'Not Found',
  },

  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: 'Internal Server Error',
  },
  CONFLICT: {
    status: 409,
    message: 'Email already exists',
  },
};

module.exports = ERROR_MESSAGES;