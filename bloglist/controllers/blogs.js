const Blog = require('../models/blog.js')

module.exports = {
    list: async (req, res, next) => {
        try {
            const blogs = await Blog.find({})

            res.json(blogs)
        } catch (err) {
            next(err)
        }
    },

    create: async (req, res, next) => {
        try {
            const blog = new Blog(req.body)

            const result = await blog.save()

            res.status(201).json(result)
        } catch (err) {
            next(err)
        }

    }
}