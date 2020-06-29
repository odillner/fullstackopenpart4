const Blog = require('../models/blog.js')

module.exports = {
    list: (req, res, next) => {
        Blog
        .find({})
        .then(blogs => {
          res.json(blogs)
        })
    },

    create: (req, res, next) => {
        const blog = new Blog(req.body)

        blog
          .save()
          .then(result => {
            res.status(201).json(result)
        })
    }
}