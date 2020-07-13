const User = require('../models/user')
const tokenHelper = require('./tokenHelper')

module.exports = async (req, res, next) => {
    const token = tokenHelper.extract(req)
    if (token) {
        const decodedToken = tokenHelper.decode(token)

        const user = await User.findById(decodedToken.id)

        req.authUser = user
    }

    next()
}