const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const tokenExtractor = (request, response, next) => {
  request.token = null
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }

  next()
}

const userExtractor = async (request, response, next) => {

  const token = request.token
  let decodedToken = null
  if(token && token.length > 0){
    decodedToken = jwt.verify(token, process.env.SECRET)
  }
  if (!token || !_.has(decodedToken,'id')) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if(!user) {
    return response.status(401).json({ error: 'user not found' })
  }

  request.user = user

  next()
}

const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    }
  
    next(error)
  }

  module.exports = {
    errorHandler,
    tokenExtractor,
    userExtractor
  }