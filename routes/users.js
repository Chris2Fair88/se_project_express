const router = require('express').Router();
const { getCurrentUser, updateCurrentUser } = require('../controllers/users');
const { validateUpdateUser } = require('../middlewares/validation');

router.get('/users/me', getCurrentUser);
router.patch('/users/me', validateUpdateUser, updateCurrentUser);

module.exports = router;