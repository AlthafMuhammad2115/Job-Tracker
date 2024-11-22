const express = require('express');
const JobApplication = require('../models/jobapplications.model');
const Company = require('../models/companies.model');
const router = express.Router();

// Create a new job application
router.post('/create_job_application', async (req, res) => {
  try {
    const jobApplication = new JobApplication(req.body);
    const savedApplication = await jobApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// List all job applications with company name included
router.get('/list_job_application', async (req, res) => {
  try {
    const applications = await JobApplication.aggregate([
      {
        $lookup: {
          from: 'companies',
          localField: 'company_id',
          foreignField: '_id',
          as: 'companyDetails',
        },
      },
      {
        $unwind: '$companyDetails',
      },
      {
        $project: {
          _id: 1,
          job_id: 1,
          job_title:1,
          company_id: 1,
          company_name: '$companyDetails.company_name',
          location: 1,
          salary: 1,
          notes: 1,
          skill: 1,
          post_no: 1,
          posted_date: 1,
          last_date: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a job application
router.put('/edit_job_application/:id', async (req, res) => {
  try {
    const updatedApplication = await JobApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedApplication) {
      return res.status(404).json({ message: 'Job application not found' });
    }
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a job application
router.delete('/delete_job_application/:id', async (req, res) => {
  try {
    const deletedApplication = await JobApplication.findByIdAndDelete(req.params.id);
    if (!deletedApplication) {
      return res.status(404).json({ message: 'Job application not found' });
    }
    res.status(200).json({ message: 'Job application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
