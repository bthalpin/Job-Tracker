const router = require('express').Router();
const {
  getJob,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
} = require('../../controllers/jobController.js');

// /api/Jobs
router.route('/').get(getJob).post(createJob);

// /api/Jobs/:JobId
router
  .route('/:jobId')
  .get(getSingleJob)
  .put(updateJob)
  .delete(deleteJob);

module.exports = router;
