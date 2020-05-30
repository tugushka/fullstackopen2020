const express = require('express');
const morgan = require('morgan');
const app = express();
const mongoose = require('mongoose');

app.use(express.static('build'));
app.use(express.json());

morgan.token('body', (req) => {
  // console.log('from token', req.body);
  return JSON.stringify(req.body);
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  // skip: (req, res) => {
  //   console.log('from skip', req.method, req.method !== 'POST');
  //   return req.method !== 'POST'
}))

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Person = require('./models/person');

app.get('/info', (req, res) => {
  Person.find({}).then( result => {
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

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if( person ){
        res.json(person);
      } else {
        res.status(404).send(`Can't find person with given id: ${req.params.id}`)
      }
    })
    .catch( error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then((result) => {
      if( result ){
        console.log(`Deleted ${req.params.id} :`, result);
        res.json(result);
      } else {
        res.status(404).end();
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number
  }

  Person.findByIdAndUpdate( req.params.id, person, {runValidators: true, context: 'query', new: true})
    .then((updatedPerson) => {
      console.log(`Updated ${req.params.id} :`, updatedPerson);
      res.json(updatedPerson);
    })
    .catch(error => {
      next(error)
    })
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body;

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save()
    .then(result => {
      res.json(result);
    })
    .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if( error.name === 'ValidationError' ) {
    return response.status(400).json({error : error.message})
  }

  next(error)
}

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})