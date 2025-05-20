const User = require('../models/user');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      if (!users || users.length === 0) {
        return res.status(404).send({ message: 'No users found' });
      }
      return res.status(200).send(users);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ message: 'An error occurred while getting users' });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
        return res.status(400).send({ message: 'Invalid user id' });
      }
      return res.status(500).send({ message: 'An error occurred' });
    });
};


const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err.message});
      } else {
        res.status(500).send({ message: err.message });
      }
    });
}

module.exports = {
  getUsers,
  getUser,
  createUser
};
