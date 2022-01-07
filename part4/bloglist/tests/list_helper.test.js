const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })


  describe('total likes', () => {
    
    test('when list is empty, total likes should be null', () => {
      const result = listHelper.totalLikes([])
      expect(result).toBe(null)
    })
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })

    test('when list has only multiple blogs, find the sum of likes', () => {
      const result = listHelper.totalLikes(blogs)
      expect(result).toBe(36)
    })
  })

  describe('favorite blog', () => {
    test('when list is empty, favorite blog should an object with empty properties', () => {
      const result = listHelper.favoriteBlog([])
      expect(result).toEqual({
        title: null,
        author: null,
        likes: 0
      })
    })

    test('when list has only one blog, that is the favroite', () => {
      const result = listHelper.favoriteBlog(listWithOneBlog)
      expect(result).toEqual({
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        likes: 5
      })
    })

    test('find blog with most likes in a list', () => {
      const result = listHelper.favoriteBlog(blogs)
      expect(result).toEqual({
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      })
    })

  })

  describe('most blogs', () => {
    test('when list is empty, most blogs should be an object with empty author', () => {
      const result = listHelper.mostBlogs([])
      expect(result).toEqual({
        author: null,
        blogs: 0
      })
    })

    test('when list is single blog, return blog author with count of 1', () => {
      const result = listHelper.mostBlogs(listWithOneBlog)
      expect(result).toEqual({
        author: 'Edsger W. Dijkstra',
        blogs: 1
      })
    })

    test('find author with the most posts in a list of blogs', () => {
      const result = listHelper.mostBlogs(blogs)
      expect(result).toEqual({
        author: "Robert C. Martin",
        blogs: 3
      })
    })
  })

  describe('most likes', () => {
    test('when list is empty, most likes should be an object with empty author', () => {
      const result = listHelper.mostLikes([])
      expect(result).toEqual({
        author: null,
        likes: 0
      })
    })

    test('when list is single blog, return blog author with number of likes', () => {
      const result = listHelper.mostLikes(listWithOneBlog)
      expect(result).toEqual({
        author: 'Edsger W. Dijkstra',
        likes: 5
      })
    })

    test('find author with the most likes in a list of blogs', () => {
      const result = listHelper.mostLikes(blogs)
      expect(result).toEqual({
        author: "Edsger W. Dijkstra",
        likes: 17
      })
    })
  })