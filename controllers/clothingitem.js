const ClothingItem = require('../models/clothingitem');

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send(items))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: 'An error occurred while getting items' });
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => res.status(201).send(item))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: err.message });
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .then((item) => {
      if (!item) {
      }
      return res.status(200).send({ message: 'Item deleted', item });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === 'CastError') {
      }
      return res.status(500).send({ message: 'An error occurred' });
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
};
