const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

//Route: '/api/blogs'

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();

  response.status(201).json(result);
})

module.exports = blogsRouter;