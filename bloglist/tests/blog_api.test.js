const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'HTML is easy',
        author: 'asd',
        url: 'www.www.www'
    },
    {
        title: 'Browser can execute only Javascript',
        author: 'asd',
        url: 'www.www.www'
    },
]
beforeEach(async () => {
    await Blog.deleteMany({})

    let noteObject = new Blog(initialBlogs[0])
    await noteObject.save()

    noteObject = new Blog(initialBlogs[1])
    await noteObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})
test('all blogs returned', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(contents).toContain(
        'Browser can execute only Javascript'
    )
})

test('the first blog is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].title).toBe('HTML is easy')
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'async/await simplifies making async calls',
        author: 'asd',
        url: 'www.www.www'
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain(
        'async/await simplifies making async calls'
    )
})

afterAll(() => {
    mongoose.connection.close()
})