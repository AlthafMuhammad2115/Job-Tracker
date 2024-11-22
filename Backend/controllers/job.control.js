const JobApplication = require('../models/job.model');
const Application = require('../models/applications.model');
const Company = require('../models/companies.model');
const mongoose = require('mongoose');

exports.create_job_application = async (req, res) => {
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

        res.status(400).json({ message: error.message });
    }
}

exports.list_job_application = async (req, res) => {
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
        res.status(500).json({ message: error.message });
    }
}

exports.edit_job_application = async (req, res) => {
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
}

exports.delete_job_application = async (req, res) => {
    try {
        const deletedApplication = await JobApplication.findByIdAndDelete(req.params.id);
        if (!deletedApplication) {
            return res.status(404).json({ message: 'Job application not found' });
        }
        res.status(200).json({ message: 'Job application deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}