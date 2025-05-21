const express = require('express');
const router = express.Router();
const userRouter = require('./users');
const clothingItemsRouter = require('./clothingitem');


router.use('/users', userRouter);
router.use('/',clothingItemsRouter);
router.use((req, res) => {
  res.status(404).send({ message: err.message });
}
);


module.exports = router;