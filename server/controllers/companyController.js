const { Company } = require('../models');
const { ObjectId } = require('mongoose').Types;

module.exports = {
  // Get all Company
  getCompany(req, res) {
    Company.find()
      .then((companys) => res.json(companys))
      .catch((err) => res.status(500).json(err));
  },
  // Get a Company
  getSingleCompany(req, res) {
      console.log(req.params)
    Company.findOne({ _id: req.params.companyId })
      .select('-__v')
      .populate('jobs')
      .then((company) =>
        !company
          ? res.status(404).json({ message: 'No Company with that ID' })
          :res.json(company)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a Company
  createCompany(req, res) {
    // console.log('sssssssssssssssssssssssssssssssssssssssss',req,'bodasdasdas ds dasdasdasdy')
    Company.create(req.body)
      .then((company) => res.json(company))
      .catch((err) => {
        // console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a Company
  deleteCompany(req, res) {
    Company.findOneAndDelete({ _id: ObjectId(req.params.companyId) })
      .then((company) =>
        !company
          ? res.status(404).json({ message: 'No Company with that ID' })
          : Company.find().then((companies) => res.json(companies))
      )
      .catch((err) => res.status(500).json(err));
  },
  // Update a Company
  updateCompany(req, res) {
    Company.findOneAndUpdate(
      { _id: req.params.companyId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((company) =>
        !company
          ? res.status(404).json({ message: 'No Company with this id!' })
          : res.json(company)
      )
      .catch((err) => res.status(500).json(err));
  },
};
