const express = require('express');

const router = express.Router();
const userRouter = require('./users');
const clothingItemsRouter = require('./clothingitem');

const { NotFoundError } = require('../utils/errors');

router.use('/', clothingItemsRouter);
router.use('/', userRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Route not found'));
});

module.exports = router;