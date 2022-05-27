const router = require('express').Router();
const {
  getJob,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
} = require('../../controllers/jobController.js');

// /api/Jobs
router.route('/:companyId').get(getJob).post(createJob);

// /api/Jobs/:JobId
router
  .route('/:companyId/:jobId')
  .get(getSingleJob)
  .put(updateJob)
  .delete(deleteJob);

module.exports = router;
