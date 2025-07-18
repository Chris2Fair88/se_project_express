const express = require('express');

const router = express.Router();
const userRouter = require('./users');
const clothingItemsRouter = require('./clothingitem');

const { NOT_FOUND } = require('../utils/errors');

router.use('/', clothingItemsRouter);
router.use('/', userRouter);

router.use((req, res) => {
  res.status(NOT_FOUND.status).send({ message: NOT_FOUND.message });
});

module.exports = router;