const blogs = require('../controllers/blogs')

module.exports = (app) => {
    app.route('/api/blogs')
        .get(blogs.list)
        .post(blogs.create)

    app.route('/api/blogs/:id')
        .get(blogs.read)
        .put(blogs.update)
        .delete(blogs.remove)
}
