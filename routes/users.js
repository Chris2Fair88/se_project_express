const router = require('express').Router();
const { getCurrentUser, updateCurrentUser, createUser } = require('../controllers/users');
const { validateCreateUser, validateUpdateUser, validateId } = require('../middlewares/validation');

router.get('/users/me', getCurrentUser);
router.post('/signup', validateCreateUser, createUser);
router.patch('/users/me', validateUpdateUser, updateCurrentUser);
router.use(validateId);

module.exports = router;