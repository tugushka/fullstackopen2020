const config = require('./utils/config.js');
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
require('express-async-errors');

const mongoUrl = config.MONGODB_URI
  
mongoose.set('useFindAndModify', false);

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then( () => {
    console.log('Connected to MongoDB');
  })
  .catch( error => {
    console.log('Error occured while connecting to MongoDB: ', error.message);
  })

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogsRouter);

module.exports = app;