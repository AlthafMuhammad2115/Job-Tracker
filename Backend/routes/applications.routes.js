const express = require('express');
const router = express.Router();
const { add_applicant, list_applicants, update_status, filter_applicants } = require('../controllers/applications.control')

module.exports = router;
router.post('/add_applicant/:companyId/:jobId', add_applicant);

router.get('/list_applicants/:companyId/:jobId/', list_applicants);

router.patch('/update_status/:companyId/:jobId', update_status);

router.post('/filter_applicants/:companyId/:jobId', filter_applicants);


