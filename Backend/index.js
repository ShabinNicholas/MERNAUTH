require('dotenv').config()
const express = require('express')
let routes = require('./routes/userRoutes')
let taskRoutes = require('./routes/taskRoute')
let connectDB = require('./db')
const cors = require('cors')

connectDB()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/', routes)
app.use('/task', taskRoutes)


app.listen(3000, () => {
    console.log("Server is running on port 3000");
})