const mongoose = require('mongoose')
const { Schema } = mongoose

//schema for data to enter in registration form
const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
})

module.exports = mongoose.model('user', userSchema)

