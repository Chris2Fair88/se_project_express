const router = require('express').Router();
const { getUsers, getCurrentUser, updateCurrentUser } = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getCurrentUser);
router.patch('/users/me', updateCurrentUser);

module.exports = router;