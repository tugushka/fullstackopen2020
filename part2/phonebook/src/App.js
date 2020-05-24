import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    // console.log('newName is', event.target.value);
    setNewName( event.target.value );
  }

  const handleNameSubmit = (event) => {
    event.preventDefault();
    console.log(persons);
    if( persons.find( person => person.name === newName ) ) {
      alert(`${newName} is already added to phonebook`);
    } else {
      setPersons(persons.concat({name: newName}));
      // console.log('Saved', newName);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNameSubmit}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map( person => (
        <p key={person.name}>{person.name}</p>
        ))
      }
    </div>
  )
}

export default App