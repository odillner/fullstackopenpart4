const jwt = require('jsonwebtoken')
const {SECRET} = require('./config')

module.exports = {
    extract: (req) => {
        const auth = req.get('authorization')
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            return auth.substring(7)
        }
        return null
    },

    decode: (token) => {
        if (token) {
            const decoded = jwt.verify(token, SECRET)
            return decoded
        }
        return null
    },

    sign: (user) => {
        const token = jwt.sign(user, SECRET)
        return token
    }
}