const { Company } = require('../models');

module.exports = {
  // Get all Company
  getCompany(req, res) {
    Company.find()
      .then((companys) => res.json(companys))
      .catch((err) => res.status(500).json(err));
  },
  // Get a Company
  getSingleCompany(req, res) {
    Company.findOne({ _id: req.params.companyId })
      .select('-__v')
      .populate('Jobs')
      .then((company) =>
        !company
          ? res.status(404).json({ message: 'No Company with that ID' })
          :res.json({job,company})
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a Company
  createCompany(req, res) {
    Company.create(req.body)
      .then((company) => res.json(company))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a Company
  deleteCompany(req, res) {
    Company.findOneAndDelete({ _id: req.params.CompanyId })
      .then((company) =>
        !company
          ? res.status(404).json({ message: 'No Company with that ID' })
          : Company.find().then((companys) => res.json(companys))
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
