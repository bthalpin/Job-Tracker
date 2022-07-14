const router = require('express').Router();
const {
    login,
    createUser,
    updateUser,
    deleteUser
} = require('../controllers/userController.js');

// /user
router.route('/').post(createUser);
router.route('/login').post(login);
router.route('/:userId').put(updateUser).delete(deleteUser);

module.exports = router;
