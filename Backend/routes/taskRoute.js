// route.js
let express = require('express')
let routes = express.Router()
let controller = require('../controller/taskController')
const verifyToken = require("../middleware/auth")

// CRUD
//CREATE
routes.post('/createTask', verifyToken, controller.createTask)

//READ
routes.get('/getAll', verifyToken, controller.getTasks)

//Get individual task
routes.get('/getOne/:id', verifyToken, controller.getTask)

//DELETE
routes.delete('/deleteTask/:id', verifyToken, controller.deleteTask)

//Update
routes.put('/editTask/:id', verifyToken, controller.editTask)


module.exports = routes