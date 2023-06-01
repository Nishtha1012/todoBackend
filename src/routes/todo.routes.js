const express = require('express')
const { addTodo, updateTodo, deleteTodo, getTodos } = require('../controller/todo.controller')

const router = express.Router()

router.get('/get', getTodos)
router.post('/add', addTodo)
router.post('/update', updateTodo)
router.post('/delete', deleteTodo)

module.exports = router