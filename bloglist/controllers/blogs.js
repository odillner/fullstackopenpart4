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

    },

    read: async (req, res, next) => {
        try {
            const blog = await Blog.findById(req.params.id)

            if (!blog) {
                let err = new Error('Resource not found')
                err.name = 'NotFoundError'
                throw err
            }

            res.json(blog)
            res.end()

        } catch (err) {
            next(err)
        }
    },

    update: async (req, res, next) => {
        try {
            const blog = await Blog.findOneAndUpdate({_id: req.params.id}, req.body, {new: true, useFindAndModify: false, runValidators: true})

            if (!blog) {
                let err = new Error('Resource not found')
                err.name = 'NotFoundError'
                throw err
            }

            res.json(blog)
            res.end()
        } catch (err) {
            next(err)
        }
    },

    remove: async (req, res, next) => {
        try {
            const blog = await Blog.findById(req.params.id)

            if (!blog) {
                let err = new Error('Resource not found')
                err.name = 'NotFoundError'
                throw err
            }

            await Blog.deleteOne({'_id':req.params.id})
            res.status(200).end()
        } catch (err) {
            next(err)
        }
    },
}