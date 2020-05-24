import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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

  return (
    <div>
      <h2>Phonebook</h2>
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