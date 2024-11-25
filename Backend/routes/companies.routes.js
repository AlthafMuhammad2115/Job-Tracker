const express = require('express')
const router = express.Router()

module.exports = router
const { signup, login,list_company_job } = require('../controllers/companies.control')

router.post('/signup', signup)

router.post('/login', login)

router.get('/jobs/:companyId',list_company_job);