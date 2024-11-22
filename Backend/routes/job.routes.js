const express = require('express');
const router = express.Router();
const { create_job_application, list_job_application, edit_job_application, delete_job_application } = require('../controllers/job.control')
module.exports = router;

// Create a new job application
router.post('/create_job_application', create_job_application);


// List all job applications with company name included
router.get('/list_job_application', list_job_application);

// Update a job application
router.put('/edit_job_application/:id', edit_job_application);

// Delete a job application
router.delete('/delete_job_application/:id', delete_job_application);

