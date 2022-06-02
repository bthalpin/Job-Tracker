const router = require('express').Router();
const {
  getAllJobs,
  getJob,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
} = require('../../controllers/jobController.js');
const {loginRequired} = require('../../utils/auths');

router.route('/myjobs').get(getAllJobs)
// /api/Jobs
router.route('/:companyId').get(loginRequired,getJob).post(createJob);

// /api/Jobs/:JobId
router
  .route('/:companyId/:jobId')
  .get(loginRequired,getSingleJob)
  .put(updateJob)
  .delete(loginRequired,deleteJob);

module.exports = router;
