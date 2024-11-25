const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const jwt_key = process.env.JWT_USER_TOKEN_KEY;

const userModel=require('../models/user.model')
const Applications=require('../models/applications.model')
exports.signup = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        const user = await userModel.findOne({ email });

        if (user) {
            res.json({ message: 'Mail ID Already Exist', status: 302 });
            return
        }

        const encryptedPassword = bcrypt.hash(password, 10)

        const newModel = new userModel({
            username: username,
            email: email.toLowerCase(),
            password: await encryptedPassword
        })

        await newModel.save()
        const users = await userModel.findOne({ email })
        res.json({ token: generateTokenResponse(users), status: 200, result: 'FOUND',userid:users._id,username:users.username})

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email })

        if (user) {
            const IsPresent = await bcrypt.compare(password, user.password);

            if (IsPresent) {
                res.status(200).json({ token: generateTokenResponse(user), status: 200, result: 'FOUND',userid:user._id,username:user.username})
            } else {
                res.json({ status: 302, result: 'Password Mismatch' })
            }
        } else {
            res.json({ status: 400, result: 'Email not found' })
        }
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

generateTokenResponse = (user) => {
    const token = jwt.sign({ data: user }, jwt_key, { expiresIn: '30d' });
    return token;
}

exports.userapplications =async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Find applications where the user is in the applicants array
      const applications = await Applications.find({
        'applicants.user_id': userId,
      })
        .populate('company_id', 'company_name') // Populate company details
        .populate('job_id', 'job_title location salary'); // Populate job details
  
      if (!applications || applications.length === 0) {
        return res.status(404).json({ message: 'No applications found for this applicant.' });
      }
  
      // Filter applications for the specific user
      const userApplications = applications.map((application) => {
        const applicantData = application.applicants.find(
          (applicant) => String(applicant.user_id) === userId
        );
  
        return {
          job_id: application.job_id,
          job_title: application.job_id.job_title,
          company_name: application.company_id.company_name,
          status: applicantData.status,
          applied_date: applicantData.applied_date,
        };
      });
  
      res.status(200).json(userApplications);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  }