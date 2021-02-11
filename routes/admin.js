const express = require('express')
const Router = express.Router()
const {login, user} = require('../controllers/admin')

Router.post('/login', login)
Router.post('/user', user)

module.exports = Router