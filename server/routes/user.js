const router = require('express').Router();
const {
//   getJob,
//   getSingleJob,
    login,
    createUser,
//   updateJob,
//   deleteJob,
} = require('../controllers/userController.js');

// /user
router.route('/').post(createUser);
router.route('/login').post(login)
// /user
// router
//   .route('/:companyId/:jobId')
//   .get('getSingleJob')
//   .put('updateJob')
//   .delete('deleteJob');

module.exports = router;
