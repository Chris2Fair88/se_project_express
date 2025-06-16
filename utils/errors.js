const ERROR_MESSAGES = {
  BAD_REQUEST: {
    status: 400,
    message: 'Bad Request',
  },
  UNAUTHORIZED: {
    status: 401,
    message: 'Incorrect email or password',
  },
    FORBIDDEN: {
    status: 403,
    message: 'You can only delete your own items.',
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