const Blog = require('../models/blog.js')

module.exports = {
    list: async (req, res, next) => {
        try {
            const blogs = await Blog
                .find({})
                .populate('user')

            res.json(blogs)
        } catch (err) {
            next(err)
        }
    },

    create: async (req, res, next) => {
        try {
            const user = req.authUser

            if (!user) {
                let err = new Error('Invalid token')
                err.name = 'AuthenticationError'
                throw err
            }

            const body = req.body

            const blog = new Blog(body)
            blog.user = user.id

            const savedBlog = await blog.save()
            user.blogs = user.blogs.concat(savedBlog._id)
            await user.save()

            res.status(201).json(savedBlog)
        } catch (err) {
            next(err)
        }

    },

    read: async (req, res, next) => {
        try {
            const id = req.params.id

            const blog = await Blog.findById(id)
                .populate('user')

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
            const user = req.authUser
            const id = req.params.id
            const body = req.body

            if (!user) {
                let err = new Error('Invalid token')
                err.name = 'AuthenticationError'
                throw err
            }

            const blog = await Blog.findById(id)

            if (!blog) {
                let err = new Error('Resource not found')
                err.name = 'NotFoundError'
                throw err
            }

            if (user.id != blog.user) {
                let err = new Error('Invalid user')
                err.name = 'AuthenticationError'
                throw err
            }

            const newBlog = await Blog.findOneAndUpdate(
                {_id: id},
                body,
                {new: true, useFindAndModify: false, runValidators: true}
            )

            if (!newBlog) {
                let err = new Error('Resource not found')
                err.name = 'NotFoundError'
                throw err
            }

            res.json(newBlog)
            res.end()
        } catch (err) {
            next(err)
        }
    },

    remove: async (req, res, next) => {
        try {
            const id = req.params.id
            const user = req.authUser

            if (!user) {
                let err = new Error('Invalid token')
                err.name = 'AuthenticationError'
                throw err
            }

            const blog = await Blog.findById(id)

            if (!blog) {
                let err = new Error('Resource not found')
                err.name = 'NotFoundError'
                throw err
            }

            if (user.id != blog.user) {
                let err = new Error('Invalid user')
                err.name = 'AuthenticationError'
                throw err
            }

            const deletedBlog = await Blog.deleteOne({'_id':id})
            user.blogs = user.blogs.filter(blog => blog.id != deletedBlog._id)
            await user.save()

            res.status(200).end()
        } catch (err) {
            next(err)
        }
    },
}