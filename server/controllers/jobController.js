const { Job } = require('../models');

module.exports = {
  // Get all job
  getJob(req, res) {
    Job.find()
      .then((jobs) => res.json(jobs))
      .catch((err) => res.status(500).json(err));
  },
  // Get a job
  getSingleJob(req, res) {
    Job.findOne({ _id: req.params.jobId })
      .select('-__v')
      .then((job) =>
        !job
          ? res.status(404).json({ message: 'No job with that ID' })
          : res.json(job)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a job
  createJob(req, res) {
    Job.create(req.body)
      .then((job) => res.json(job))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a job
  deleteJob(req, res) {
    Job.findOneAndDelete({ _id: req.params.jobId })
      .then((job) =>
        !job
          ? res.status(404).json({ message: 'No job with that ID' })
          : Job.find().then((jobs) => res.json(jobs))
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update a job
  updateJob(req, res) {
    Job.findOneAndUpdate(
      { _id: req.params.jobId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((job) =>
        !job
          ? res.status(404).json({ message: 'No job with this id!' })
          : res.json(job)
      )
      .catch((err) => res.status(500).json(err));
  },
};