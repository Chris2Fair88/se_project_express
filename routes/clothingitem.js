const express = require('express');
const { createItem, deleteItem, likeItem, dislikeItem } = require('../controllers/clothingitem');
const { validateCreateClothingItem, validateCreateUser, validateUpdateUser } = require('../middlewares/validation');

const router = express.Router();

router.post('/items', validateCreateClothingItem, createItem);

router.delete('/items/:itemId', validateId, deleteItem);
router.put('/items/:itemId/likes', validateId, likeItem);
router.delete('/items/:itemId/likes', validateId, dislikeItem);

router.post('/signup', validateCreateUser, createUser);
router.patch('/users/me', validateUpdateUser, updateCurrentUser);

module.exports = router;