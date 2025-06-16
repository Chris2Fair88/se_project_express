const express = require('express');
const { createItem, deleteItem, likeItem, dislikeItem } = require('../controllers/clothingitem');

const router = express.Router();



router.post('/items', createItem);
router.delete('/items/:itemId', deleteItem);
router.put('/items/:itemId/likes', likeItem);
router.delete('/items/:itemId/likes', dislikeItem);
module.exports = router;