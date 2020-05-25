import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Countries = ({countryList, filter}) => {
  const filteredCountries = countryList.filter( country => 
    country.name.toLowerCase().includes(filter.toLowerCase())
  )

  console.log('filtered', filteredCountries);
  
  if( filteredCountries.length > 10 ) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }
  
  if( filteredCountries.length === 1 ) {
    let curCountry = filteredCountries[0];
    return (
      <div>
        <h1>{curCountry.name}</h1>
        <p>capital {curCountry.capital}</p>
        <p>population {curCountry.population} </p>

        <h4>languages</h4>
        <ul>
          {curCountry.languages.map( language => 
            <li key={curCountry.name+language.name}>{language.name}</li>
          )}
        </ul>
        <img src={curCountry.flag} alt={curCountry.name} style={{height:180}}/>
      </div>
    )
  }
  
  if( filteredCountries.length > 1 ) {
    return (
      <div>
        { filteredCountries.map( country => (
            <p key={country.name}>{country.name}</p>
          )
        )}
      </div>
    )
  }

  return (
    <></>
  )
}

const App = () => {
  const [filter, setFilter] = useState('');
  const [countryList, setCountryList] = useState([]);

  const handleChangeFilter = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  }

  useEffect( () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then( response => {
        setCountryList(response.data);
      })
  }, []);

  return (
    <div>
      <p>find countries <input onChange={handleChangeFilter} /></p>
      <Countries countryList={countryList} filter={filter}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);