module.exports = {
    dummy : (blogs) => {
        return 1
    },

    totalLikes : (blogs) => {
        if (blogs.length === 0) {
            return 0
        }

        const reducer = (sum, blog) => {
            return sum + blog.likes
        }

        return blogs.reduce(reducer, 0)
    },

    favoriteBlog : (blogs) => {
        if (blogs.length === 0) {
            return {}
        }

        let favorite = blogs[0]

        blogs.forEach(blog => {
            if (blog.likes > favorite.likes) {
                favorite = blog
            }
        })

        return favorite
    },

    mostBlogs : (blogs) => {
        if (blogs.length === 0) {
            return {}
        }

        let authors = []

        const sorter = (blog, list) => {
            if (list.length !== 0) {
                list.forEach(entry => {
                    if (entry.author === blog.author) {
                        entry.total++
                        return list
                    }
                })
            }

            list = list.concat([{author: blog.author, total: 1}])

            return list
        }

        blogs.forEach(blog => {
            authors = sorter(blog, authors)
        })

        if (authors.length === 0) {
            return {}
        }

        let favorite = authors[0]

        authors.forEach(author => {
            if (author.total > favorite.total) {
                favorite = author
            }
        })

        return favorite
    },

    mostLikes : (blogs) => {
        if (blogs.length === 0) {
            return {}
        }

        let authors = []

        const sorter = (blog, list) => {
            if (list.length !== 0) {
                list.forEach(entry => {
                    if (entry.author === blog.author) {
                        entry.total += blog.likes
                        return list
                    }
                })
            }

            list = list.concat([{author: blog.author, total: blog.likes}])

            return list
        }

        blogs.forEach(blog => {
            authors = sorter(blog, authors)
        })

        if (authors.length === 0) {
            return {}
        }

        let favorite = authors[0]

        authors.forEach(author => {
            if (author.total > favorite.total) {
                favorite = author
            }
        })

        return favorite
    }
}