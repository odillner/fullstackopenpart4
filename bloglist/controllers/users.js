const bcrypt = require('bcrypt')

const User = require('../models/user.js')

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const users = await User
                .find({})

            res.json(users)
        } catch (err) {
            next(err)
        }
    },

    create: async (req, res, next) => {
        try {
            const body = req.body

            if (!body.password) {
                let err = new Error('No password field')
                err.name = 'ValidationError'
                throw err
            }

            if (body.password.length < 8) {
                let err = new Error('Too short password')
                err.name = 'ValidationError'
                throw err
            }

            const saltRounds = 10
            const passwordHash = await bcrypt.hash(body.password, saltRounds)

            const user = new User({
                username: body.username,
                name: body.name,
                email: body.email,
                passwordHash: passwordHash
            })

            const result = await user.save()

            res.status(201).json(result)
        } catch (err) {
            next(err)
        }
    },

    getById: async (req, res, next) => {
        try {
            const id = req.params.id

            const user = await User
                .findById(id)

            if (!user) {
                let err = new Error('Resource not found')
                err.name = 'NotFoundError'
                throw err
            }

            res.json(user)
        } catch (err) {
            next(err)
        }
    },

    getByName: async (req, res, next) => {
        try {
            const name = req.params.name

            const user = await User
                .findOne({username:name})

            if (!user) {
                let err = new Error('Resource not found')
                err.name = 'NotFoundError'
                throw err
            }

            res.json(user)
        } catch (err) {
            next(err)
        }
    },

    update: async (req, res, next) => {
        try {
            const id = req.params.id
            const body = req.body

            const user = await User
                .findOneAndUpdate({_id: id}, body, {new: true, useFindAndModify: false, runValidators: true})

            if (!user) {
                let err = new Error('Resource not found')
                err.name = 'NotFoundError'
                throw err
            }

            res.json(user)
        } catch (err) {
            next(err)
        }
    },

    remove: async (req, res, next) => {
        try {
            const id = req.params.id

            const player = await User
                .findById(id)

            if (!player) {
                let err = new Error('Resource not found')
                err.name = 'NotFoundError'
                throw err
            }

            await User
                .deleteOne({'_id':id})

            res.status(200).end()
        } catch (err) {
            next(err)
        }
    },


}