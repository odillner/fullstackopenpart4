const Blog = require('../models/blog.js')

module.exports = {
    list: (req, res) => {
        Blog
            .find({})
            .then(blogs => {
                res.json(blogs)
            })
    },

    create: (req, res) => {
        const blog = new Blog(req.body)

        blog
            .save()
            .then(result => {
                res.status(201).json(result)
            })
    }
}