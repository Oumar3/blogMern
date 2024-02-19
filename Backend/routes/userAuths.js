const {registerUserController} = require('../controllers/authController')
const {loginUserController} = require('../controllers/loginController')
const express = require('express')
const router = express.Router()


router.post('/register',registerUserController)
router.post('/login',loginUserController)




module.exports = router