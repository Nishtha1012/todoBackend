const mongoose = require('mongoose')
const { Schema } = mongoose

const todoType = new Schema({
    todo: { type: String },
    description: { type: String },
    status: { type: String, default: 'pending' }
})

//schema for todo
const todoSchema = new Schema({
    email: { type: String, required: true, unique: true },
    todos: { type: [todoType], default: [] }
})

const toDo = mongoose.model('todo', todoSchema)
module.exports = {
    toDo,
    todoType
}