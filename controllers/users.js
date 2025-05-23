const User = require('../models/user');
const ERROR_MESSAGES = require('../utils/errors');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      return res.status(200).send(users);
    })
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
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === 'ValidationError') {
        return res.status(ERROR_MESSAGES.BAD_REQUEST.status).send({ message: ERROR_MESSAGES.BAD_REQUEST.message });
      } else {
        return res.status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR.status).send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.message });
      }
    });
}

module.exports = {
  getUsers,
  getUser,
  createUser
};
