const userRoute = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
//Route: '/api/users/'

userRoute.get('/', async (req, res) => {
  const users = await User
    .find({})
    .populate('blogs');
  
  res.json(users);
})

userRoute.post('/', async (req, res) => {
  const body = req.body;

  if( (!body.username) || (!body.password) ) {
    throw {message: "No username or password given", name: "ValidationError"}
  }

  if( (body.username.length < 3) || (body.password.length < 3) ) {  
    throw {message: "Length of username or password is less than 3", name: "ValidationError"}
  }

  const passwordHash = await bcrypt.hash(body.password, 10);
  const user = new User({
    username: body.username,
    name: body.name,
    password: passwordHash
  })

  const savedUser = await user.save();
  res.json(savedUser);
})

module.exports = userRoute;