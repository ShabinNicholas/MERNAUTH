const mongoose = require('mongoose')

let TaskSchema = mongoose.Schema({
    taskName: String,
    taskPriority: String,
    taskDeadline: Date,

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
})

module.exports = mongoose.model("taskList", TaskSchema)