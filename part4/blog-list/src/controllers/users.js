const userRoute = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
//Route: '/api/users/'

userRoute.get('/', async (req, res) => {
  const users = await User.find({});
  res.json(users);
})

userRoute.post('/', async (req, res) => {
  const body = req.body;

  if( (!body.username) || (!body.name) || (!body.password) ) {
    return res.status(400).end();
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