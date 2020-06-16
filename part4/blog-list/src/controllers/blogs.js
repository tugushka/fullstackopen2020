const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');
//Route: '/api/blogs'

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({})
    .populate('user', {blogs: 0});

  res.json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  const body = req.body;
  
  const decodedToken = jwt.decode(req.token, require('../utils/config').SECRET);
  if( !decodedToken || !decodedToken.id ) {
    return res
      .status(401)
      .json({
        error: 'token missing or invalid'
      })
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.status(201).json(savedBlog);
})

blogsRouter.delete('/', async (req, res) =>{
  const body = req.body;
  
  const decodedToken = jwt.decode(req.token, require('../utils/config').SECRET);
  if( !decodedToken || !decodedToken.id ) {
    return res
      .status(401)
      .json({
        error: 'token missing or invalid'
      })
  }

  const user = await User.findById(decodedToken.id);
  const blogToBeDeleted = await Blog.findById(body.id);

  // console.log('user', user);
  // console.log('blogToBeDeleted', blogToBeDeleted);

  if( user._id.toString() !== blogToBeDeleted.user.toString()) {
    return res
      .status(401)
      .json({
        error: 'token missing or invalid'
      })
  }

  user.blogs = await user.blogs.filter(blog => blog.id !== blogToBeDeleted.id );
  user.save();
  await blogToBeDeleted.delete();

  res.status(204).end();
})

blogsRouter.put('/', async (req, res) =>{
  await Blog.findOneAndUpdate(req.body);
  res.status(204).end();
})

module.exports = blogsRouter;