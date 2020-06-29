const blogs = require('../controllers/blogs')

module.exports = (app) => {
    app.route('/api/blogs')
        .get(blogs.list)
        .post(blogs.create)
}
