const { JWT_SECRET } = require('../utils/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const ERROR_MESSAGES = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.error(err);
      return res.status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR.status).send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.message });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
      return res.status(ERROR_MESSAGES.NOT_FOUND.status).send({ message: ERROR_MESSAGES.NOT_FOUND.message });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
        return res.status(ERROR_MESSAGES.BAD_REQUEST.status).send({ message: ERROR_MESSAGES.BAD_REQUEST.message });
      }
      return res.status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR.status).send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.message });
    });
};


const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
.then(hashedPassword => {
  return User.create({ name, avatar, email, password: hashedPassword });
})
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(ERROR_MESSAGES.CONFLICT.status).send({ message: ERROR_MESSAGES.CONFLICT.message });
      }
      console.error(err);
      if (err.name === 'ValidationError') {
        return res.status(ERROR_MESSAGES.BAD_REQUEST.status).send({ message: ERROR_MESSAGES.BAD_REQUEST.message });
      }
        return res.status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR.status).send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.message });

    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findbyCredentials(email, password)
    .then((user) => {

  const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
  expiresIn: "7d",
});
res.send({ token });
})
.catch( err => {res.status(ERROR_MESSAGES.UNAUTHORIZED.status).send({ message: ERROR_MESSAGES.UNAUTHORIZED.message });
});
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  login
};
