const express = require('express')
const routes = express.Router()
const controller = require('../controller/userController')

routes.post('/signup', controller.signUp)
routes.post('/signin', controller.signIn)
routes.get('/refreshToken', controller.refreshToken)


module.exports= routes