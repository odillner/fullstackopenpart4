const listHelper = require('../utils/list_helper')
const {listWithOneBlog, listWithSeveralBlogs} = require('./test_helpers')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', () => {
    test('single blog list', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })

    test('several blog list', () => {
        const result = listHelper.totalLikes(listWithSeveralBlogs)
        expect(result).toBe(36)
    })

    test('empty blog list', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })
})

describe('favorite blog', () => {
    test('single blog list', () => {
        const result = listHelper.favoriteBlog(listWithOneBlog)
        expect(result).toEqual(listWithOneBlog[0])
    })

    test('several blog list', () => {
        const result = listHelper.favoriteBlog(listWithSeveralBlogs)
        expect(result).toEqual(listWithSeveralBlogs[2])
    })

    test('empty blog list', () => {
        const result = listHelper.favoriteBlog([])
        expect(result).toEqual({})
    })
})

describe('author with most blogs', () => {
    test('single blog list', () => {
        const result = listHelper.mostBlogs(listWithOneBlog)
        expect(result).toEqual({author: 'Edsger W. Dijkstra', total: 1})
    })

    test('several blog list', () => {
        const result = listHelper.mostBlogs(listWithSeveralBlogs)
        expect(result).toEqual({author: 'Robert C. Martin', total: 3})
    })

    test('empty blog list', () => {
        const result = listHelper.mostBlogs([])
        expect(result).toEqual({})
    })
})

describe('author with most likes', () => {
    test('single blog list', () => {
        const result = listHelper.mostLikes(listWithOneBlog)
        expect(result).toEqual({author: 'Edsger W. Dijkstra', total: 5})
    })

    test('several blog list', () => {
        const result = listHelper.mostLikes(listWithSeveralBlogs)
        expect(result).toEqual({author: 'Edsger W. Dijkstra', total: 17})
    })

    test('empty blog list', () => {
        const result = listHelper.mostLikes([])
        expect(result).toEqual({})
    })
})