const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const { request } = require('express')
const _ = require('lodash')

describe('when there is initially one user in db', () => {
    beforeAll(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = helper.newUser

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('creation of a duplicate username fails', async () => {
        const dupUser = helper.newUser
  
        await api
          .post('/api/users')
          .send(dupUser)
          .expect(400)
      })

      test('creating a user without a username fails', async () => {
        
        const noUsername = { password: 'This should fail' }
  
        await api
          .post('/api/users')
          .send(noUsername)
          .expect(400)
      })

      test('creating a user with a short username should fail', async () => {
        
        const noUsername = { username: 'sa', password: 'This should fail' }
  
        await api
          .post('/api/users')
          .send(noUsername)
          .expect(400)
      })

      test('creating a user without a password should fail', async () => {
        
        const noUsername = { username: 'Nopassword' }
  
        await api
          .post('/api/users')
          .send(noUsername)
          .expect(400)
      })

      test('creating a user with a short password should fail', async () => {
        
        const noUsername = { username: 'Nopassword', password: 'n0' }
  
        await api
          .post('/api/users')
          .send(noUsername)
          .expect(400)
      })
  })

  describe('after adding user and blogs, make sure blogs are listed when getting user', () => {
    beforeAll(async () => {
        await Blog.deleteMany({})
        await User.deleteMany({})
        console.log(`Test DB cleared`)

        const passwordHash = await bcrypt.hash('sekret', 10)
        const newUser = new User({ username: 'root', passwordHash })

        await newUser.save()

        const users = await helper.usersInDb()
        const user = users[0].id
    
        await api.post('/api/blogs').send({...helper.initialBlogs[0],user})
        await api.post('/api/blogs').send({...helper.initialBlogs[1],user})
        await api.post('/api/blogs').send({...helper.initialBlogs[2],user})
        await api.post('/api/blogs').send({...helper.initialBlogs[3],user})
    })

    test('call to /api/users should return blogs as well', async () => {
        
        const response = await api.get('/api/users')
        const users = response.body

        console.log(`Users: ${JSON.stringify(users)}`)

        _.reduce(users, (res,user) => {
            return _.reduce(user.blogs, (x, blog) => {_.has(blog,'title') && x},true) && res
        },true)

        expect(users[0].blogs).toHaveLength(4)
    })
  })

  describe('Test login functionality', () => {
    beforeAll(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
    test('root user logs in and recieves a token', async () => {
        const response = await api.post('/api/login').send({username:'root',password:'sekret'})
        const body = response.body
        expect(body.token).not.toBeNull()
        expect(body.username).toBe('root')
    })
})

  

  afterAll(() => {
    mongoose.connection.close()
    console.log('Test DB connection closed')
})