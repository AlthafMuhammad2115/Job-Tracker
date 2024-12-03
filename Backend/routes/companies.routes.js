const express = require('express')
const router = express.Router()

module.exports = router
const { signup, login,list_company_job } = require('../controllers/companies.control')
const{AdminAuthToken}=require('../middlewares/auth.middleware')

router.post('/signup', signup)

router.post('/login', login)

// need admin auth
router.get('/jobs/:companyId',AdminAuthToken,list_company_job);