const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const _ = require('lodash')

usersRouter.post('/', async (request, response) => {
  const body = request.body
  console.log(`Post to create user: ${JSON.stringify(body)}`)

  const password = _.has(body,'password') ? body.password : null
  if(!password || password.length < 3){
    throw({name:'ValidationError', message:'Passowrd not present or does not meet requirements'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter