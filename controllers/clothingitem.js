const ClothingItem = require('../models/clothingitem');
const ERROR_MESSAGES = require('../utils/errors');

const getItems = (req, res) => {
  ClothingItem.find({})

    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      res.status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR.status).send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.message });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;
  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === 'ValidationError') {
        return res.status(ERROR_MESSAGES.BAD_REQUEST.status).send({ message: ERROR_MESSAGES.BAD_REQUEST.message });
      }
      return res.status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR.status).send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
  .orFail()
    .then((item) => {
      if (!item) {
        return res.status(ERROR_MESSAGES.NOT_FOUND.status).send({ message: ERROR_MESSAGES.NOT_FOUND.message });
      }
      return res.status(200).send({ message: 'Item deleted', item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
        return res.status(ERROR_MESSAGES.BAD_REQUEST.status).send({ message: ERROR_MESSAGES.BAD_REQUEST.message });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_MESSAGES.NOT_FOUND.status).send({ message: ERROR_MESSAGES.NOT_FOUND.message });
      }
      return res.status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR.status).send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.message });
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
        return res.status(ERROR_MESSAGES.BAD_REQUEST.status).send({ message: ERROR_MESSAGES.BAD_REQUEST.message });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_MESSAGES.NOT_FOUND.status).send({ message: ERROR_MESSAGES.NOT_FOUND.message });
      }
      return res.status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR.status).send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.message });
    });
};

const dislikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
        return res.status(ERROR_MESSAGES.BAD_REQUEST.status).send({ message: ERROR_MESSAGES.BAD_REQUEST.message });
      }
      if (err.name === 'DocumentNotFoundError') {
        return res.status(ERROR_MESSAGES.NOT_FOUND.status).send({ message: ERROR_MESSAGES.NOT_FOUND.message });
      }
      return res.status(ERROR_MESSAGES.INTERNAL_SERVER_ERROR.status).send({ message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR.message });
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
