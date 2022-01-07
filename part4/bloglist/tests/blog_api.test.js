const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const _ = require('lodash')
const listHelper = require('../utils/list_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log(`Test DB cleared`)
  
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

describe('/api/blogs route', () => {
    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })

    test('blogs are returned with an :id field', async () => {
        const blogs = await api.get('/api/blogs')

        const blogsHaveId = _.reduce(blogs, blog => {
            return _.has(blog,'id')
        },true)
    })
})

  
afterAll(() => {
mongoose.connection.close()
console.log('Test DB connection closed')
})