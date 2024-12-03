const JobApplication = require('../models/job.model');
const Application = require('../models/applications.model');
const Company = require('../models/companies.model');
const mongoose = require('mongoose');

create_job_application = async (req, res,next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        // Create the job application
        const jobApplication = new JobApplication(req.body);
        const savedJobApplication = await jobApplication.save({ session });

        const application = new Application({
            company_id: savedJobApplication.company_id,
            job_id: savedJobApplication._id,
            applicants: []
        });

        await application.save({ session });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            message: 'Job application and application document created successfully',
            jobApplication: savedJobApplication,
            application,
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        error.statusCode = 400;
        error.message = error.message
        next(error);
    }
}

list_job_application = async (req, res,next) => {
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
                    job_title: 1,
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
        error.statusCode = 500;
        error.message = error.message
        next(error);
    }
}

edit_job_application = async (req, res,next) => {
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
        error.statusCode = 400;
        error.message = error.message
        next(error);
    }
}

delete_job_application = async (req, res,next) => {
    try {
        const deletedApplication = await JobApplication.findByIdAndDelete(req.params.id);
        if (!deletedApplication) {
            return res.status(404).json({ message: 'Job application not found' });
        }
        res.status(200).json({ message: 'Job application deleted successfully' });
    } catch (error) {
        error.statusCode = 500;
        error.message = error.message
        next(error);
    }
}


filterJobs = async (req, res,next) => {
    try {
      const { location, skill, salary } = req.body;
  
      const query = {};
  
      if (location) {
        query.location = { $regex: location, $options: 'i' };
      }
  
      if (skill) {
        query.skill = { $in: [skill] };
      }
  
      if (salary && salary.startRange !== undefined && salary.endRange !== undefined) {
        query.salary = { $gte: salary.startRange, $lte: salary.endRange };
      }
  

      const jobs = await JobApplication.find(query)
        .populate({
          path: 'company_id',
          select: 'company_name',
        });
  
      const jobsWithCompanyName = jobs.map((job) => ({
        job_id: job._id,
        job_title: job.job_title,
        location: job.location,
        salary: job.salary,
        skill: job.skill,
        post_no: job.post_no,
        company_name: job.company_id?.company_name || 'Unknown',
      }));
  
      return res.status(200).json({
        success: true,
        count: jobsWithCompanyName.length,
        data: jobsWithCompanyName,
      });
    } catch (error) {
        error.statusCode = 500;
        error.message = 'Server error'
        next(error);
    }
  };
  
  module.exports={filterJobs,delete_job_application,edit_job_application,list_job_application,create_job_application}

