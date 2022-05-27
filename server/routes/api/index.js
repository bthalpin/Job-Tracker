const router = require('express').Router();
const jobRoutes = require('./jobRoutes');
const companyRoutes = require('./companyRoutes');

router.use('/jobs', jobRoutes);
router.use('/company', companyRoutes);

module.exports = router;
