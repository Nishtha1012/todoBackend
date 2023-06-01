const express = require('express')

const { userSignup, userLogin, userVerify, userlogout } = require('../controller/user.controller')

const router = express.Router()

router.post('/signup', userSignup)
router.post('/login', userLogin)

router.get('/verify', userVerify)
router.get('/logout', userlogout)

module.exports = router