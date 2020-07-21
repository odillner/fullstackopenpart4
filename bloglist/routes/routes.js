const blogs = require('../controllers/blogs')
const users = require('../controllers/users')
const login = require('../controllers/login')
const testing = require('../controllers/testing')

module.exports = (app) => {
    app.route('/api/blogs')
        .get(blogs.list)
        .post(blogs.create)

    app.route('/api/blogs/:id')
        .get(blogs.read)
        .put(blogs.update)
        .delete(blogs.remove)

    app.route('/api/users')
        .get(users.getAll)
        .post(users.create)

    app.route('/api/users/:id')
        .get(users.getById)
        .put(users.update)
        .delete(users.remove)

    app.route('/api/login/')
        .post(login.auth)

    if (process.env.NODE_ENV === 'test') {
        app.route('/api/testing/reset')
            .post(testing.reset)
    }
}
