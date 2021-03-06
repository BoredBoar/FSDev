const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10
      },
      {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
      },
      {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
      }  
]

const newBlog = {
  title: "Did You Know",
  author: "Stan the Mann",
  url: "http://blog.ouhealth.com/DYK.html",
  likes: 25896,
}

const blogMissingLikes = {
  title: "No one likes me",
  author: "Fred Plue",
  url: "http://blog.ouhealth.com/fred.html",
}

const blogMissingTitle = {
  author: "Fred Plue",
  url: "http://blog.ouhealth.com/fred.html",
  likes: 0
}

const blogMissingUrl = {
  title: "No one likes me",
  author: "Fred Plue",
  likes: 0
}

const newUser = {
  username: 'tsmith',
  name: 'Tom Smith',
  password: 'passw0rd',
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = { initialBlogs, blogsInDb, newBlog, blogMissingLikes, usersInDb, newUser}