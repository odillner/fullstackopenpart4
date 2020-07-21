const Blog = require('../models/blog.js')
const User = require('../models/user.js')

module.exports = {
    reset: async (req, res, next) => {
        try {
            await User.deleteMany({})
            await Blog.deleteMany({})

            res.status(204).end()
        } catch (err) {
            next (err)
        }
    }
}