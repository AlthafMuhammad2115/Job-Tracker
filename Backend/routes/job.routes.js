const express = require('express');
const router = express.Router();
const { create_job_application, list_job_application, edit_job_application, delete_job_application ,filterJobs} = require('../controllers/job.control')
const{AdminAuthToken}=require('../middlewares/auth.middleware')

module.exports = router;

// Create a new job application
// need admin auth
router.post('/create_job_application',AdminAuthToken, create_job_application);


// List all job applications with company name included
router.get('/list_job_application', list_job_application);

//filter jobs by skill salary and location
router.post('/fliter_jobs',filterJobs)

// Update a job application
// need admin auth
router.put('/edit_job_application/:id',AdminAuthToken, edit_job_application);

// Delete a job application
// need admin auth
router.delete('/delete_job_application/:id',AdminAuthToken, delete_job_application);


