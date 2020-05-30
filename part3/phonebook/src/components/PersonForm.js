import React, {useState} from 'react'
import peoplesService from '../services/peoples'

const PersonForm = ({persons, setPersons, setNotification}) => {
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
    // There's a bug when adding exact objects from two different tabs
    // Because persons doesn't change when tab1 adds a person, submitting
    // the same object from tab2 is processed.
    // Gonna fix later lol
    const foundPerson = persons.find( person => person.name === newName );
    if( foundPerson ) {
      // Update existing person's number
      if( window.confirm(`${foundPerson.name} is already added to phonebook, replace the old number with a new one?`)) {  
        peoplesService
          .update({...foundPerson, number:newNumber}, foundPerson.id)
          .then( () => {
            setNewName('');
            setNewNumber('');
            setNotification({
              message:`Updated phone number of ${foundPerson.name}`, 
              type:'success'
            });
          })
          .catch( error => {
            console.log('error.response from update', error.response)
            setNotification({
              message: error.response.data.error, 
              type:'error'
            });
          })
  
        peoplesService
          .getAll()
          .then( response => setPersons(response.data) )
        
      }
    } else {
      // Add new person to db
      const newPerson = {name: newName, number: newNumber}
      console.log('Creating', newPerson);
      peoplesService
        .create(newPerson)
        .then( response => {
          console.log(response.data)
          setNewName('');
          setNewNumber('');
          setNotification({
            message:`Added ${newPerson.name}`, 
            type:'success'
          });
        })
        .catch( error => {
          console.log('error.response', error.response)
          setNotification({
            message: error.response.data.error, 
            type:'error'
          });
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