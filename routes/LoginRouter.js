const { Router } = require('express');

const router = Router()

const LoginHandler = require('../controller/LoginController');

router.post("/login" ,LoginHandler.LoginHandler)

module.exports = router