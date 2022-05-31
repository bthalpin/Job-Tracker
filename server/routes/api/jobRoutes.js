const router = require('express').Router();
const {
  getJob,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
} = require('../../controllers/jobController.js');
const {loginRequired} = require('../../utils/auths');

// /api/Jobs
router.route('/:companyId').get(loginRequired,getJob).post(loginRequired,createJob);

// /api/Jobs/:JobId
router
  .route('/:companyId/:jobId')
  .get(loginRequired,getSingleJob)
  .put(loginRequired,updateJob)
  .delete(loginRequired,deleteJob);

module.exports = router;
