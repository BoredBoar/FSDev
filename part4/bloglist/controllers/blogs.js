const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user')
  response.json(blog)
})
  
blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  let decodedToken = null
  if(token && token.length > 0){
    decodedToken = jwt.verify(token, process.env.SECRET)
  }
  if (!token || !_.has(decodedToken,'id')) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  const requestedBlog = await Blog.findById(request.params.id)

  if(user.id.toString() === requestedBlog.user.toString()){
    const blog = await Blog.findByIdAndDelete(request.params.id)
    response.json(blog)
  }
  response.status(403).json({error: 'Permission denied, on the creator of the message can delete it'})
})

blogsRouter.post('/', async (request, response) => {
  const token = request.token
  let decodedToken = null
  if(token && token.length > 0){
    decodedToken = jwt.verify(token, process.env.SECRET)
  }
  if (!token || !_.has(decodedToken,'id')) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  console.log(`1: ${JSON.stringify(user)}`);

  const blog = new Blog({...request.body, user: user.id})

  const savedBlog = await blog.save()
  console.log(`2: ${JSON.stringify(savedBlog)}`);

  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()
  console.log(`3: ${JSON.stringify(user)}`)

  response.status(201).json(savedBlog)
})

module.exports = blogsRouter