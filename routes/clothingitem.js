const express = require('express');
const { getItems, createItem, deleteItem } = require('../controllers/clothingitem');

const router = express.Router();

router.get('/items', getItems); // GET all items
router.post('/items', createItem); // POST create item
router.delete('/items/:itemId', deleteItem); // DELETE item by id

module.exports = router;