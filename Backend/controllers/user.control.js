const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const jwt_key = process.env.JWT_USER_TOKEN_KEY;

const userModel=require('../models/user.model')

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
        res.json({ result: 'OK', status: 200 })

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
                res.status(200).json({ token: generateTokenResponse(user), status: 200, result: 'FOUND', username: user.username, userId: user._id })
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