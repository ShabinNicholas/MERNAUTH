const mongoose = require('mongoose')
const connectDB = () => {
    try {
        mongoose.connect("mongodb://localhost:27017/test1")
        console.log("Database Connected successfully");
    } catch (error) {
        console.log("Error in connecting to DB", error);
    }
}

module.exports = connectDB