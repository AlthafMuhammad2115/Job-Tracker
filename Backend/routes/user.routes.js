const express = require('express')
const router = express.Router()

module.exports = router
const { signup, login,userapplications } = require('../controllers/user.control')

router.post('/signup', signup)

router.post('/login', login)

router.get('/applicant/:userId',userapplications);