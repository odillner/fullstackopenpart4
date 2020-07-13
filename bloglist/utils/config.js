require('dotenv').config()

let PORT = process.env.PORT
let DB_URL = process.env.DB_URL
let SECRET = process.env.SECRET

if (process.env.NODE_ENV === 'test') {
    DB_URL = process.env.TEST_DB_URL
}

module.exports = {
    DB_URL,
    PORT,
    SECRET
}
