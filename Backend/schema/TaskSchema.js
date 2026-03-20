// TaskSchema.js
const mongoose = require('mongoose')

let TaskSchema = mongoose.Schema({
    taskName: String,
    taskPriority: String,
    taskDeadline: Date,
})

module.exports = mongoose.model("taskList", TaskSchema)