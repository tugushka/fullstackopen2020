const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(express.json());

morgan.token('body', (req, res) => {
  // console.log('from token', req.body);
  return JSON.stringify(req.body);
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  skip: (req, res) => {
    // console.log('from skip', req.method, req.method !== 'POST');
    return req.method !== 'POST'
  }
}))

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${(new Date()).toUTCString()}</p>
  `)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find( person => person.id === id );

  if( person ) {
    res.json(person);
  } else {
    res.status(404).end();
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter( person => person.id !== id );

  res.status(204).end();
})

app.post('/api/persons', (req, res) => {
  const body = req.body;
  // console.log('from POST', body);
  if( !body.name || !body.number ) {
    return res.status(404).json({
      error : 'name or number is missing'
    })
  }

  if( persons.find( person => person.name === body.name ) ) {
    return res.status(400).json({
      error : 'name must be unique'
    })
  }

  const newPerson = {
    ...body,
    id: Math.floor(Math.random()*1e9)
  }
  persons = persons.concat(newPerson);

  res.json(newPerson);
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})