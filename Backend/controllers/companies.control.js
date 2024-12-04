const companySignUpModel = require('../models/companies.model')
const Job = require('../models/job.model')

const { comparePassword, generateAdminToken, hashPassword } = require('../utils/helpers.utils')

signup = async (req, res,next) => {

    try {
        const { company_name, email, password } = req.body;

        const company = await companySignUpModel.findOne({ email });
        if (company) {
            res.status(302).json({ message: 'Mail ID Already Exist'});
            return
        }

        const encryptedPassword = await hashPassword(password);

        const newModel = new companySignUpModel({
            company_name: company_name,
            email: email.toLowerCase(),
            password: await encryptedPassword
        })

        await newModel.save();

        const signed_company = await companySignUpModel.findOne({ email: email });

        res.status(200).json({ token: generateAdminToken(signed_company),userid: signed_company._id, company_name: signed_company.company_name })

    } catch (error) {
        error.statusCode = 400;
        error.message = error.message
        next(error);
    }
}

login = async (req, res,next) => {

    try {
        const { email, password } = req.body;

        const company = await companySignUpModel.findOne({ email })

        if (company) {
            const IsPresent = await comparePassword(password, company.password);

            if (IsPresent) {
                res.status(200).json({ token: generateAdminToken(company), userid: company._id, company_name: company.company_name })
            } else {
                res.status(302).json({result: 'Password Mismatch' })
            }
        } else {
            res.status(400).json({result: 'Email not found' })
        }
    } catch (error) {
        error.statusCode = 400;
        error.message = error.message
        next(error);
    }
}

list_company_job = async (req, res,next) => {
    try {
        const { companyId } = req.params;

        // Find all jobs posted by the specified company
        const jobs = await Job.find({ company_id: companyId });

        // If no jobs are found
        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No jobs found for this company',
            });
        }

        // Respond with the list of jobs
        res.status(200).json({
            success: true,
            jobs,
        });
    } catch (error) {
        error.statusCode = 500;
        error.message = 'Server error while fetching jobs'
        next(error);
    }
}

module.exports = { list_company_job, login, signup }