const mongoose = require('mongoose')

const dotenv = require('dotenv')
dotenv.config()

let database_url = process.env.DATABASE_URL

//to connect database at given url
mongoose.connect(database_url)

const database = mongoose.connection

module.exports = database