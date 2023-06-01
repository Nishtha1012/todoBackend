const { toDo } = require('../schema/todoSchema')
const jwt = require("jsonwebtoken")

const getLoggedinEmail = async (token) => {
    try {
        let decode = jwt.verify(token, process.env.DB_TOKEN)
        console.log(decode);
        return decode
    }
    catch (error) {
        console.log(error);
        throw error
    }
}

const addMainTodo = async (email) => {
    try {
        const todoMain = new toDo({ email })
        try {
            const data = todoMain.save()
            return data
        }
        catch (error) {
            console.log(error);
            return error
        }
    }
    catch (error) {
        console.log(error);
        return error
    }
}


module.exports = {
    getLoggedinEmail,
    addMainTodo
}