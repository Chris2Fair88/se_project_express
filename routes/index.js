const router = require('express').Router();
const userRouter = require('./users');
const clothingitem = require('./clothingitem');


router.use('/users', userRouter);
router.use('/clothingitem', clothingitem);
router.use((req, res) => {
  res.status(404).send({ message: 'Not Found' });
}
);


module.exports = router;