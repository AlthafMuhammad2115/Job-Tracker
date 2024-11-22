const express = require('express')
const router = express.Router()

module.exports = router
const { signup, login } = require('../controllers/companies.control')

router.post('/signup', signup)

router.post('/login', login)