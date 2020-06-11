const config = require('./utils/config.js');
const express = require('express')
require('express-async-errors');
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const mongoUrl = config.MONGODB_URI
  
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then( () => {
    console.log('Connected to MongoDB');
  })
  .catch( error => {
    console.log('Error occured while connecting to MongoDB: ', error.message);
  })

app.use(cors())
app.use(express.json())
app.use(require('./utils/middleware').tokenExtractor);

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

app.use(require('./utils/middleware').errorHandler);
app.use(require('./utils/middleware').unknownEndpoint);

module.exports = app;