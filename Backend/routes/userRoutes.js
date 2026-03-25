const express = require('express')
const routes = express.Router()
const controller = require('../controller/userController')

routes.post('/signup', controller.signUp)
routes.post('/signin', controller.signIn)
routes.post('/refreshToken', controller.refreshToken)
routes.post('/logout', controller.logout)


module.exports = routes