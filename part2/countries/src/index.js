import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Country = ({country, initialVisibility}) => { 
  const [visibility, setVisibility] = useState(initialVisibility);
  const style = {
    display : (visibility ? '' : 'none')
  }
  return (
    <div>
      {country.name} <button onClick={() => setVisibility(!visibility)}>show</button>
      <div style={style}>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population} </p>

        <h4>languages</h4>
        <ul>
          {country.languages.map( language => 
            <li key={country.name+language.name}>{language.name}</li>
          )}
        </ul>
        <img src={country.flag} alt={country.name} style={{height:180}}/>
      </div>
    </div>
  )
}

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
    return (
      <Country country={filteredCountries[0]} initialVisibility={true}/>
    )
  }
  
  if( filteredCountries.length > 1 ) {
    return (
      <div>
        { filteredCountries.map( country => (
            <Country country={country} initialVisibility={false}/>
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