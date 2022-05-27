const router = require('express').Router();
const {
  getCompany,
  getSingleCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} = require('../../controllers/companyController.js');

// /api/Companys
router.route('/').get(getCompany).post(createCompany);

// /api/Companys/:CompanyId
router
  .route('/:companyId')
  .get(getSingleCompany)
  .put(updateCompany)
  .delete(deleteCompany);

module.exports = router;
