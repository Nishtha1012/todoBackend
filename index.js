const express = require('express')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const database = require('./src/config/database.config')
const userRoutes = require('./src/routes/user.routes')
const todoRoutes = require('./src/routes/todo.routes')

const app = express()
app.use(cors({ origin: 'https://todo-frontend-plum.vercel.app', credentials: true }))
app.use(express.json())
app.use(cookieparser())
app.use(express.urlencoded({ extended: true }));

app.use('/', userRoutes)
app.use('/todo', todoRoutes)

app.listen(9000, () => {
    console.log('server started');
})

database.on("error", () => {
    console.log("error");
})

database.once('connected', () => {
    console.log('connected to database');
})
