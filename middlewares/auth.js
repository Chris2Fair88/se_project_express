const jwt = require('jsonwebtoken');
const ERROR_MESSAGES = require('../utils/errors');

const JWT_SECRET = 'your_jwt_secret';


const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(ERROR_MESSAGES.UNAUTHORIZED.status).send(ERROR_MESSAGES.UNAUTHORIZED.message);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res.status(ERROR_MESSAGES.UNAUTHORIZED.status).send(ERROR_MESSAGES.UNAUTHORIZED.message);
  }
  req.user = payload;
  next();
};

module.exports = auth;