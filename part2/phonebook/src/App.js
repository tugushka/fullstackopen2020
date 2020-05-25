import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]);

  useEffect( () => {
    axios
      .get('http://localhost:3001/persons')
      .then( response => {
        console.log(response);
        setPersons(response.data);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter persons={persons} />

      <h3>Add a new</h3>
      <PersonForm persons={persons} setPersons={setPersons}/>

      <h3>Numbers</h3>
      <Persons persons={persons}/>
    </div>
  )
}

export default App
