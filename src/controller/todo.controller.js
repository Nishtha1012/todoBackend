const { toDo } = require("../schema/todoSchema")
const { getLoggedinEmail } = require("../services/todo.services")

const getTodos = async (req, res) => {
    let token = req.cookies.token
    try {
        let decode = await getLoggedinEmail(token)
        let result = await toDo.findOne({ email: decode.email })
        res.status(200).send(result.todos)
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ success: false, message: 'no todos found' })
    }
}

const addTodo = async (req, res) => {
    let token = req.cookies.token
    try {
        const { todo, description } = req.body
        const todoToAdd = {
            todo, description
        }
        let decode = await getLoggedinEmail(token)

        let data = await toDo.findOne({ email: decode.email })
        if (data) {
            data.todos.push(todoToAdd)
            const resp = await data.save()
            console.log(resp);
            res.status(200).send(resp.todos)
        }
    }
    catch (error) {
        res.status(400).send({ success: false, message: 'failed to add todo' })
    }
}

const updateTodo = async (req, res) => {
    let token = req.cookies.token
    try {
        const { id, updatedStatus } = req.body
        let decode = await getLoggedinEmail(token)
        let result = await toDo.findOneAndUpdate({ email: decode.email, 'todos._id': id }, { $set: { 'todos.$.status': updatedStatus } }, { new: true })
        console.log(result);
        let data = await toDo.find({ "todos._id": id })
        console.log("data", data);
        res.status(200).send(result.todos)
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ success: false, message: 'no todos found' })
    }
}

const deleteTodo = async (req, res) => {
    let token = req.cookies.token
    try {
        const { id } = req.body
        let decode = await getLoggedinEmail(token)
        let result = await toDo.findOneAndUpdate({ email: decode.email, 'todos._id': id }, { $pull: { 'todos': { '_id': id } } }, { new: true })
        console.log(result);

        res.status(200).send(result.todos)
    }
    catch (error) {
        console.log(error);
        res.status(400).send({ success: false, message: 'no todos found' })
    }
}

module.exports = {
    getTodos,
    addTodo,
    updateTodo,
    deleteTodo
}
