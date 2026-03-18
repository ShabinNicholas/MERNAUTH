const mongoose = require('mongoose')

let UserSchema = mongoose.Schema({
    userName: String,
    userEmailId: { type: String, unique: true },
    userPassword: String,
    refreshToken: String
})

module.exports = mongoose.model("user", UserSchema)