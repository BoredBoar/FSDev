const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test_helper')

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

  

  afterAll(() => {
    mongoose.connection.close()
    console.log('Test DB connection closed')
})