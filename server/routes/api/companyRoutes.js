const router = require('express').Router();
const {
  getCompany,
  getSingleCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} = require('../../controllers/companyController.js');
const {loginRequired} = require('../../utils/auths');
// /api/Companys
router.route('/').get(loginRequired,getCompany).post(createCompany);

// /api/Companys/:CompanyId
router
  .route('/:companyId')
  .get(loginRequired,getSingleCompany)
  .put(updateCompany)
  .delete(loginRequired,deleteCompany);

module.exports = router;
