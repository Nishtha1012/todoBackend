const jwt = require('jsonwebtoken')

const user = require('../schema/userSchema')
const { encryptPassword, comparePassword } = require("./hashing")

const registerUser = async (email, password, firstname, lastname, username, dob, gender, role) => {
    try {
        const isexisting = await user.findOne({ email })
        console.log("is existing", isexisting);

        if (isexisting) {
            throw isexisting
        }

        const hashedPassword = await encryptPassword(password)

        const userToAdd = new user({
            email, password: hashedPassword, firstname, lastname, username, dob, gender, role
        })
        try {
            console.log('here');
            const data = await userToAdd.save()
            return data
        }
        catch (error) {
            throw error
        }
    }
    catch (error) {
        console.log("errror", error)
        throw error
    }
}

//check the user in database when user login
const checkLoginUSer = async (email, password) => {
    try {
        console.log(email);

        const data = await user.findOne({ email })
        console.log(password);
        console.log(data);
        const checkPassword = await comparePassword(password, data.password)
        console.log(checkPassword);

        if (checkPassword) return { success: true }
        else throw error
    }
    catch (error) {
        console.log(error);
        throw error
    }
}

//verifies logged in users token
const verifyuser = async (token) => {
    try {
        if (token) {
            let decode = jwt.verify(token, process.env.DB_TOKEN)
            console.log("decode", decode);
            let email = decode.email
            const data = await user.findOne({ email })
            return { success: true, firstname: data.firstname, lastname: data.lastname }
        }
        else {
            throw error
        }
    }
    catch (error) {
        console.log("err", error);
        throw error
    }
}

module.exports = {
    registerUser,
    checkLoginUSer,
    verifyuser
}
