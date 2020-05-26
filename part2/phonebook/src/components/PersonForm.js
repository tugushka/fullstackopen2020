import React, {useState} from 'react'
import axios from 'axios'

const PersonForm = ({persons, setPersons}) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  
  const handleNameChange = (event) => {
    setNewName( event.target.value );
  }

  const handleNumberChange = (event) => {
    setNewNumber( event.target.value );
  }

  const handleNameSubmit = (event) => {
    event.preventDefault();
    console.log(persons);
    if( persons.find( person => person.name === newName ) ) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const newPerson = {name: newName, number: newNumber}
      axios
        .post('http://localhost:3001/persons', newPerson)

      setPersons(persons.concat(newPerson));
    }
  }

  return (
    <form onSubmit={handleNameSubmit}>
      <div>name: <input onChange={handleNameChange} /></div>
      <div>number: <input onChange={handleNumberChange} /></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default PersonForm