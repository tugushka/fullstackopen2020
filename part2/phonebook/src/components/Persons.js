import React from 'react'
import peoplesService from '../services/peoples'

const Person = ({person, setPersons, setNotification}) => {
  const handleDeleteClick = (event) => {
    if( window.confirm(`Delete ${person.name}?`) ) {
      console.log('Deleting', person);
      peoplesService
        .remove(person.id)
        .then( () => {
          setNotification({
            message:`Deleted ${person.name}`, 
            type:'success'
          });
          setTimeout(() => setNotification(null), 5000);
        })
        .catch( (error) => {
          setNotification({
            message:`Error occured while deleting ${person.name}`, 
            type:'error'
          });
          setTimeout(() => setNotification(null), 5000);
        })
      
      peoplesService
        .getAll()
        .then( response => {
          setPersons(response.data);
        })
    }
  }
  
  return (
    <div>
      <p>{person.name} {person.number} <button onClick={handleDeleteClick}>delete</button></p>
    </div>
  )
}

const Persons = ({persons, setPersons, setNotification}) => {
  return (
    <div>
      {persons.map( person => (
        <Person key={person.name} person={person} setPersons={setPersons} setNotification={setNotification} />
        )
      )}
    </div>
  )
}

export default Persons;