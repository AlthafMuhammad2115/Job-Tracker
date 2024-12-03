const express = require('express')
const router = express.Router()

const { signup, login,userapplications } = require('../controllers/user.control')
const{UserAuthToken}=require('../middlewares/auth.middleware')

module.exports = router

router.post('/signup', signup)

router.post('/login', login)


// user auth
router.get('/applicant/:userId',UserAuthToken,userapplications);

