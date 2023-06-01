const bcrypt = require('bcrypt')

//to hash the passeord while registering
async function encryptPassword(password, saltRounds = 10) {
    try {
        const salt = await bcrypt.genSalt(saltRounds)
        return await bcrypt.hash(password, salt)
    }
    catch (error) {
        console.log(error)
    }
}

//to comapare database password and entered password at login
async function comparePassword(data, hash) {
    try {
        let result = await bcrypt.compare(data, hash)
        console.log("result", result);
        return result
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { encryptPassword, comparePassword }