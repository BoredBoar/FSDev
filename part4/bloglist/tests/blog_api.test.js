const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const _ = require('lodash')
const listHelper = require('../utils/list_helper')
const { response } = require('express')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log(`Test DB cleared`)
  
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

describe('GET /api/blogs route', () => {
    test('blogs are returned as json', async () => {
        await api
          .get('/api/blogs')
          .expect(200)
          .expect('Content-Type', /application\/json/)
      })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('blogs are returned with an :id field', async () => {
        const response = await api.get('/api/blogs')
        const blogs = response.body

        const blogsHaveId = _.reduce(blogs, blog => {
            return _.has(blog,'id')
        },true)
    })
})

describe('POST /api/blogs route', () => {
    test('posting to the API creates results in the correct number of blogs', async () => {
        const response = await api.post('/api/blogs').send(helper.newBlog)
        const getResponse = await api.get('/api/blogs')
        expect(getResponse.body).toHaveLength(helper.initialBlogs.length + 1)
    })

    test('posting to the API returns the corect blog', async () => {
        const response = await api.post('/api/blogs').send(helper.newBlog)
        expect(response.body).toMatchObject(helper.newBlog)
    })

    test('posting a blog missing likes returns likes = 0', async () => {
        const response = await api.post('/api/blogs').send(helper.blogMissingLikes)
        expect(response.body).toMatchObject({...helper.blogMissingLikes, likes:0})
    })

    test('posting a blog missing Title results in status 400', async () => {
        const response = await api.post('/api/blogs').send(helper.blogMissingTitle)
        expect(response.status).toBe(400)
    })

    test('posting a blog missing url results in status 400', async () => {
        const response = await api.post('/api/blogs').send(helper.blogMissingUrl)
        expect(response.status).toBe(400)
    })
})

describe('GET /api/ID route', () => {
    test('requesting a blog ID returns the correct blog', async () => {
        const response = await api.get('/api/blogs')
        const blogs = response.body

        const responseWithId = await api.get(`/api/blogs/${blogs[3].id}`)
        expect(responseWithId.body).toMatchObject(blogs[3])
    })
})

describe('DELETE /api/ID route', () => {
    test('deleting a blog post removes it from the list', async () => {
        const response = await api.get('/api/blogs')
        const blogs = response.body

        const responseWithId = await api.delete(`/api/blogs/${blogs[3].id}`)

        const responseAfterDelete = await api.get('/api/blogs')
        const afterblogs = responseAfterDelete.body
        expect(afterblogs).toHaveLength(blogs.length - 1)
        expect(_.filter(afterblogs,{id: blogs[3].id})).toHaveLength(0)
    })
})

  
afterAll(() => {
mongoose.connection.close()
console.log('Test DB connection closed')
})