import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filteredPersons, setNewFilteredPersons] = useState([]);

  const handleNameChange = (event) => {
    setNewName( event.target.value );
  }

  const handleNameSubmit = (event) => {
    event.preventDefault();
    console.log(persons);
    if( persons.find( person => person.name === newName ) ) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}));
      // console.log('Saved', newName);
    }
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value);
    setNewNumber( event.target.value );
  }

  const handleFilterChange = (event) => {
    setNewFilteredPersons( 
      persons.filter( person => 
        person.name.toLowerCase().includes(
          event.target.value.toLowerCase()
        )
      )
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <p>filter shown with <input onChange={handleFilterChange} /></p>
        {
          filteredPersons.map( person => (
            <p key={person.name}>{person.name} {person.number}</p>
          ))
        }
      </div>

      <form onSubmit={handleNameSubmit}>
        <div>name: <input onChange={handleNameChange} /></div>
        <div>number: <input onChange={handleNumberChange} /></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map( person => (
        <p key={person.name}>{person.name} {person.number}</p>
        ))
      }
    </div>
  )
}

export default App