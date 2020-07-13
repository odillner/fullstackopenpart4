const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const {listWithOneBlog, listWithSeveralBlogs} = require('./test_helpers')

beforeEach(async () => {
    await Blog.deleteMany({})

    for (const blog of listWithSeveralBlogs) {
        const newBlog = new Blog(blog)
        await newBlog.save()
    }
})
describe('getting blogs', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs returned', async () => {
        const response = await api.get('/api/blogs')

        const expected = listWithSeveralBlogs.map(blog => blog.title)

        const contents = response.body.map(blog => blog.title)

        expect(response.body).toHaveLength(listWithSeveralBlogs.length)
        expect(contents).toEqual(expected)
    })

    test('a specific blog is returned', async () => {
        const response = await api.get('/api/blogs')

        const contents = response.body.map(blog => blog.title)

        expect(contents).toContain(listWithSeveralBlogs[0].title)
    })

    test('blog "_id" property is properly transformed', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body[0].id).toBeDefined()
    })
})

describe('adding blogs', () => {
    test('a valid blog can be added', async () => {
        await api
            .post('/api/blogs')
            .send(listWithOneBlog[0])
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        const contents = response.body.map(blog => blog.title)

        expect(response.body).toHaveLength(listWithSeveralBlogs.length + 1)
        expect(contents).toContain(
            listWithOneBlog[0].title
        )
    })

    test('blog without title is not added', async () => {
        const newBlog = {url: 'asd'}

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(listWithSeveralBlogs.length)
    })

    test('blog without url is not added', async () => {
        const newBlog = {title: 'asd'}

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(listWithSeveralBlogs.length)
    })

    test('new blog without likes has 0 likes', async () => {
        const newBlogWithoutLikes = {title: 'asd', url: 'asd'}

        const response = await api
            .post('/api/blogs')
            .send(newBlogWithoutLikes)
            .expect(201)

        expect(response.body.likes).toBe(0)
    })
})
describe('reading/manipulating specific blogs', () => {
    test('specific blog with valid id is fetched', async () => {
        const specificBlog = listWithSeveralBlogs[0]

        const response = await api.get('/api/blogs/' + specificBlog._id)

        expect(response.body.title).toEqual(specificBlog.title)
    })

    test('specific blog with invalid id is not fetched', async () => {
        const invalidId = 'asd'

        await api
            .get('/api/blogs/' + invalidId)
            .expect(400)
    })

    test('specific blog with valid but nonexistant id is not fetched', async () => {
        const validNonExistantId = '5a422aa71b54a676234d17f2'

        await api
            .get('/api/blogs/' + validNonExistantId)
            .expect(404)
    })

    test('specific blog with valid id is updated', async () => {
        let specificBlog = listWithSeveralBlogs[0]
        specificBlog.title = 'asd'

        const response = await api
            .put('/api/blogs/' + specificBlog._id)
            .send(specificBlog)
            .expect(200)

        expect(response.body.title).toEqual(specificBlog.title)
    })

    test('specific blog with invalid id is not updated', async () => {
        const invalidId = 'asd'
        let specificBlog = listWithSeveralBlogs[0]

        await api
            .put('/api/blogs/' + invalidId)
            .send(specificBlog)
            .expect(400)
    })

    test('specific blog with valid but nonexistant id is not updated', async () => {
        const validNonExistantId = '5a422aa71b54a676234d17f2'
        let specificBlog = listWithSeveralBlogs[0]

        await api
            .put('/api/blogs/' + validNonExistantId)
            .send(specificBlog)
            .expect(404)
    })

    test('a specific blog with valid id is deleted', async () => {
        const specificBlog = listWithSeveralBlogs[0]

        await api
            .delete('/api/blogs/' + specificBlog._id)
            .expect(200)

        const blogs = await api.get('/api/blogs')

        expect(blogs.body).toHaveLength(listWithSeveralBlogs.length-1)
    })

    test('a specific blog with invalid id is not deleted', async () => {
        const invalidId = 'asd'

        await api
            .delete('/api/blogs/' + invalidId)
            .expect(400)

        const blogs = await api.get('/api/blogs')

        expect(blogs.body).toHaveLength(listWithSeveralBlogs.length)
    })

    test('specific blog with valid but nonexistant id is not deleted', async () => {
        const validNonExistantId = '5a422aa71b54a676234d17f2'

        await api
            .get('/api/blogs/' + validNonExistantId)
            .expect(404)

        const blogs = await api.get('/api/blogs')

        expect(blogs.body).toHaveLength(listWithSeveralBlogs.length)
    })

})
afterAll(() => {
    mongoose.connection.close()
})