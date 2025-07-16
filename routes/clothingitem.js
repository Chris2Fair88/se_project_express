const express = require('express');
const { createItem, deleteItem, likeItem, dislikeItem } = require('../controllers/clothingitem');
const { validateCreateClothingItem, validateItemId, } = require('../middlewares/validation');

const router = express.Router();

router.post('/items', validateCreateClothingItem, createItem);

router.delete('/items/:itemId', validateItemId, deleteItem);
router.put('/items/:itemId/likes', validateItemId, likeItem);
router.delete('/items/:itemId/likes', validateItemId, dislikeItem);


module.exports = router;