const express = require('express')
const Router = express.Router()

// import controller
const authenticController = require('../controller/authenticController')

Router.post('/register', authenticController.register)
Router.post('/login', authenticController.login)

module.exports = Router