const express = require('express');
const router = express.Router();
const userRouter = require('./users');
const clothingItemsRouter = require('./clothingitems');


router.use('/users', userRouter);
router.use(clothingItemsRouter);
router.use((req, res) => {
}
);


module.exports = router;