const express = require('express')
const Router = express.Router()

// import controller
const authenticController = require('../controller/authenticController')

const {jwtVerify} = require('../middleware/jwt')

Router.post('/register', authenticController.register)
Router.post('/login', authenticController.login)
Router.get('/check-login',jwtVerify, authenticController.checkLogin)

module.exports = Router