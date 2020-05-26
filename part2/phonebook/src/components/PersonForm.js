import React, {useState} from 'react'
import peoplesService from '../services/peoples'

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
    console.log('persons', persons);
    const foundPerson = persons.find( person => person.name === newName );
    if( foundPerson ) {
      if( window.confirm(`${foundPerson.name} is already added to phonebook, replace the old number with a new one?`)) {  
        peoplesService
          .update({...foundPerson, number:newNumber}, foundPerson.id);
  
        peoplesService
          .getAll()
          .then( response => setPersons(response.data) )
        
        setNewName('');
        setNewNumber('');
      }
    } else {
      const newPerson = {name: newName, number: newNumber}
      console.log('Creating', newPerson);
      peoplesService
        .create(newPerson)
        .then( response => {
          console.log(response.data)
          setNewName('');
          setNewNumber('');
        })

      peoplesService
        .getAll()
        .then( response => setPersons(response.data) )
    }
  }

  return (
    <form onSubmit={handleNameSubmit}>
      name: <input onChange={handleNameChange} value={newName}/>
      number: <input onChange={handleNumberChange} value={newNumber} />
      <button type="submit">add</button>
    </form>
  )
}

export default PersonForm