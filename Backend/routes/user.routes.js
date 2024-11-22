const express = require('express')
const router = express.Router()

module.exports = router
const { signup, login } = require('../controllers/user.control')

router.post('/signup', signup)

router.post('/login', login)

