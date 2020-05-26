import React, { useState, useEffect } from 'react'
import peoplesService from './services/peoples' 
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect( () => {
    peoplesService.getAll()
      .then( response => {
        console.log(response);
        setPersons([...response.data,{name: 'test', number:'-1'}]);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} />

      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons}/>

      <h3>Numbers</h3>
      <Persons persons={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App
