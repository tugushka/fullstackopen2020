const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');

app.use(express.static('build'))
app.use(express.json());

morgan.token('body', (req, res) => {
  // console.log('from token', req.body);
  return JSON.stringify(req.body);
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  // skip: (req, res) => {
    // console.log('from skip', req.method, req.method !== 'POST');
    // return req.method !== 'POST'
}))

const Person = require('./models/person');

app.get('/info', (req, res) => {
  Person.find({}).then( result => {
    mongoose.connect.close();
    res.send(`
      <p>Phonebook has info for ${result.length} people</p>
      <p>${(new Date()).toUTCString()}</p>`
    )
  })
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then( result => {
    res.json(result);
  })
})

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id)
    .then(result => {
      res.json(person);
    })
    .catch( error => {
      console.log('Can\'t find person with given id: ', error.message);
      
      res.status(404).end();
    })
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      console.log(`Deleted ${req.params.id} :`, result);
      res.status(204).end();
    })
    .catch( error => {
      console.log('Can\'t find person with given id', error.message);
      res.status(204).end();
    })
})

app.post('/api/persons', (req, res) => {
  const body = req.body;
  if( !body.name || !body.number ) {
    return res.status(404).json({
      error : 'name or number is missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save().then(result => {
    res.json(result);
  })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})