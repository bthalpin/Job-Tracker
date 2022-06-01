const { Job,Company } = require('../models');

module.exports = {
  // Get all job
  getJob(req, res) {
    // console.log(req.user.data._id)
    Job.find({company:req.params.companyId,userId:req.user.data._id})
      .then((jobs) => res.json(jobs))
      .catch((err) => res.status(500).json(err));
  },
  // Get a job
  getSingleJob(req, res) {
    Job.findOne({ _id: req.params.jobId,userId:req.user.data._id })
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
      .then((job) => 
      !job
      ? res.status(404).json({ message: 'No job with that ID' })
      :Company.findOneAndUpdate(
        {_id:req.params.companyId},
        {$push:{jobs:job._id}},
        {new:true}
      ))
      .then(company=>
        !company
        ?res.status(404).json({ message: 'No company with that ID' })
        : res.json(company)
        )
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
    console.log(req.body)
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
