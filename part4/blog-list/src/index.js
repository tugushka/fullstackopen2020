const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config.js');
const blogsRouter = require('./controllers/blogs');

const mongoUrl = config.MONGODB_URI;
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

const PORT = config.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})