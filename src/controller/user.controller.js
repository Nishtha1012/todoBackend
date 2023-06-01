const jwt = require('jsonwebtoken')

const dotenv = require('dotenv')
dotenv.config()

const { registerUser, checkLoginUSer, verifyuser } = require('../services/user.services')
const { validateData, validateLoginData } = require('../validation/validate')
const { addMainTodo } = require('../services/todo.services')

//registers new user in database
const userSignup = async (req, res) => {
    const { email, password, firstname, lastname, username, dob, gender } = req.body
    const isvalidated = validateData(email, password, firstname, lastname, username, dob, gender)

    //gives error if the data enterd is not according to joi schema
    if (isvalidated !== true) {
        return res.status(400).json({ message: isvalidated, success: false })
    }

    try {
        let result = await registerUser(email, password, firstname, lastname, username, dob, gender)
        let resp = await addMainTodo(email)
        res.status(200)
            .json({ result, message: 'user registered successfully', success: true })

    }
    catch (error) {
        res.status(400)
            .json({ message: 'User already exist', success: false })
    }
}

//check the user in database when user login
const userLogin = async (req, res) => {
    const { email, password } = req.body
    let isvalidated = validateLoginData(email, password)

    if (isvalidated === true) {
        try {
            let result = await checkLoginUSer(email, password)
            console.log("done");
            let cookieConfig = {
                httpOnly: true
            }
            console.log('loginresult', result);

            //if user is authorized generates token
            if (result.success) {
                const token = jwt.sign({
                    email: email
                }, process.env.DB_TOKEN)

                console.log(token);
                res.status(200)
                    .cookie('token', token, cookieConfig)
                    .json({ message: 'user logged in successfully', success: true })
            }
        }
        catch (error) {
            console.log(error);
            res.status(401)
                .json({ message: "wrong credentials", success: false })
        }
    }
    else {
        res.status(400)
            .json({ message: isvalidated, success: false })
    }
}

//verifies logged in users token
const userVerify = async (req, res) => {
    let token = req.cookies.token;
    console.log("token", token);
    try {
        let data = await verifyuser(token);
        res.send({ data: data })
    }
    catch (error) {
        console.log(error, 'rejected');
        res.status(401)
            .json({ success: false, error })
    }
}

//removes the cookie when user logout
const userlogout = async (req, res) => {
    res.clearCookie("token");
    res.status(200).json({ success: true });
}


module.exports = {
    userSignup,
    userLogin,
    userVerify,
    userlogout,
}
