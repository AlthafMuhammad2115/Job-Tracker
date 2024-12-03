const mongoose = require('mongoose');
const Application = require('../models/applications.model');
const User = require('../models/user.model');

add_applicant = async (req, res,next) => {
    try {
        const { companyId, jobId } = req.params;
        const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        const application = await Application.findOne({
            company_id: new mongoose.Types.ObjectId(companyId),
            job_id: new mongoose.Types.ObjectId(jobId),
        });

        if (!application) {
            return res.status(404).json({ message: 'Application not found for the specified job and company' });
        }

        const isAlreadyApplied = application.applicants.some(
            (applicant) => applicant.user_id.toString() === user_id
        );

        if (isAlreadyApplied) {
            return res.status(201).json({
                message: 'User has already applied for this job',
            });
        }

        const newApplicant = {
            user_id: new mongoose.Types.ObjectId(user_id),
            status: 'Applied',
            applied_date: new Date(),
        };

        application.applicants.push(newApplicant);

        await application.save();

        res.status(201).json({
            message: 'Applicant added successfully',
            applicant: newApplicant
        });
    } catch (error) {
        error.statusCode = 500;
        error.message = 'Error adding applicant'
        next(error);
    }
}

list_applicants = async (req, res,next) => {
    try {
        const { companyId, jobId } = req.params;

        if (!mongoose.isValidObjectId(companyId) || !mongoose.isValidObjectId(jobId)) {
            return res.status(400).json({ message: 'Invalid company or job ID' });
        }

        const application = await Application.aggregate([
            {
                $match: {
                    company_id: new mongoose.Types.ObjectId(companyId),
                    job_id: new mongoose.Types.ObjectId(jobId),
                },
            },
            {
                $unwind: '$applicants',
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'applicants.user_id',
                    foreignField: '_id',
                    as: 'userDetails',
                },
            },
            {
                $unwind: '$userDetails',
            },
            {
                $project: {
                    _id: 0,
                    userid: '$userDetails._id',
                    username: '$userDetails.username',
                    email: '$userDetails.email',
                    status: '$applicants.status',
                    applied_date: '$applicants.applied_date',
                },
            },
        ]);

        if (application.length === 0) {
            return res.status(404).json({
                message: 'No applicants found for the specified job and company',
            });
        }

        res.status(200).json({
            message: 'Applicants retrieved successfully',
            applicants: application,
        });
    } catch (error) {
        error.statusCode = 500;
        error.message = 'Error retrieving applicants'
        next(error);
    }
}

update_status = async (req, res,next) => {
    try {
        const { companyId, jobId } = req.params;
        const { user_id, status } = req.body;

        if (!user_id || !status) {
            return res.status(400).json({ message: 'User ID and status are required' });
        }

        const validStatuses = ['Applied', 'Interviewing', 'Offered', 'Rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const application = await Application.findOne({
            company_id: new mongoose.Types.ObjectId(companyId),
            job_id: new mongoose.Types.ObjectId(jobId),
        });

        if (!application) {
            return res.status(404).json({ message: 'Application not found for the specified job and company' });
        }

        const applicant = application.applicants.find(
            (applicant) => applicant.user_id.toString() === user_id
        );

        if (!applicant) {
            return res.status(404).json({ message: 'Applicant not found' });
        }

        applicant.status = status;

        await application.save();

        res.status(200).json({
            message: 'Applicant status updated successfully',
            applicant: {
                user_id: applicant.user_id,
                status: applicant.status,
                applied_date: applicant.applied_date,
            },
        });
    } catch (error) {
        error.statusCode = 500;
        error.message = 'Error updating applicant status'
        next(error);
    }
}

filter_applicants = async (req, res,next) => {
    try {
        const { companyId, jobId } = req.params;
        const { status } = req.body;
        const validStatuses = ['Applied', 'Interviewing', 'Offered', 'Rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const application = await Application.findOne({
            company_id: new mongoose.Types.ObjectId(companyId),
            job_id: new mongoose.Types.ObjectId(jobId),
        }).populate('applicants.user_id', 'username');

        if (!application) {
            return res.status(404).json({ message: 'Application not found for the specified job and company' });
        }

        const filteredApplicants = application.applicants.filter(
            (applicant) => applicant.status === status
        );

        const result = filteredApplicants.map((applicant) => ({
            user_id: applicant.user_id._id,
            username: applicant.user_id.username,
            status: applicant.status,
            applied_date: applicant.applied_date,
        }));

        res.status(200).json({
            message: `Applicants filtered by status: ${status}`,
            applicants: result,
        });
    } catch (error) {
        error.statusCode = 500;
        error.message = 'Error filtering applicants'
        next(error);
    }
}

module.exports={filter_applicants,add_applicant,list_applicants,update_status}