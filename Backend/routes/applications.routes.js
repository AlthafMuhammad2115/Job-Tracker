const express = require('express');
const router = express.Router();
const { add_applicant, list_applicants, update_status, filter_applicants } = require('../controllers/applications.control')
const{UserAuthToken,AdminAuthToken}=require('../middlewares/auth.middleware')
module.exports = router;

// user auth
router.post('/add_applicant/:companyId/:jobId',UserAuthToken, add_applicant);

// admin auth
router.get('/list_applicants/:companyId/:jobId/',AdminAuthToken,list_applicants);

// admin auth
router.patch('/update_status/:companyId/:jobId',AdminAuthToken, update_status);

// admin auth
router.post('/filter_applicants/:companyId/:jobId',AdminAuthToken, filter_applicants);


