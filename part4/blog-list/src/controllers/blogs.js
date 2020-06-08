const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

//Route: '/api/blogs'

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  try {
    const result = await blog.save();
    response.status(201).json(result);
  } catch(error) {
    response.status(400).end();
  }
})

blogsRouter.delete('/', async (request, response) =>{
  const result = await Blog.findOneAndDelete(request.body);
  response.status(204).end();
})

blogsRouter.put('/', async (request, response) =>{
  try {
    await Blog.findOneAndUpdate(request.body);
    response.status(204).end();
  } catch(error) {
    response.status(400).end();
  }
})

module.exports = blogsRouter;