let TaskSchema = require('../schema/TaskSchema')

const createTask = async (req, res) => {
    try {

        let { taskName, taskDeadline, taskPriority } = req.body

        let newTask = new TaskSchema({
            taskName,
            taskPriority,
            taskDeadline,
            userId: req.user.id
        })
        await newTask.save()
        res.json({
            message: "Task saved"
        })
    } catch (error) {
        res.json({
            message: "Error in creating task",
            err: error
        })
    }
}

const getTasks = async (req, res) => {
    try {
        let data = await TaskSchema.find({ userId: req.user.id })
        res.json({
            taskList: data,
            message: "Task Fetched"
        })
    } catch (error) {
        res.json({
            err: error,
            message: "Error in fetching data"
        })
    }
}

const getTask = async (req, res) => {

    try {
        let task = await TaskSchema.findById(req.params.id)
        res.json({
            message: "Task fetched",
            data: task
        })
    } catch (error) {
        res.json({
            message: "Error in fetching data",
            err: error
        })
    }
}

const deleteTask = async (req, res) => {
    try {
        let deletedTask = await TaskSchema.findByIdAndDelete({
            _id: req.params.id,
            userId: req.params.id
        })
        res.json({
            message: "Task deleted successfully"
        })
    } catch (error) {
        res.json({
            message: "Error in deleting task",
            err: error
        })
    }
}

const editTask = async (req, res) => {
    try {
        let taskName = req.body.taskName
        let taskDeadline = req.body.taskDeadline
        let taskPriority = req.body.taskPriority
        let resData = await TaskSchema.findByIdAndUpdate(req.params.id, { taskName, taskPriority, taskDeadline })
        res.json({
            message: "Task updated successfully"
        })
    } catch (error) {
        res.json({
            message: "Error in updating task"
        })
    }
}

module.exports = {
    createTask,
    getTasks,
    getTask,
    deleteTask,
    editTask
}