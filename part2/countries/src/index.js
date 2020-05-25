import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Weather = ({countryName}) => {
  const api_key = process.env.REACT_APP_WEATHER_API_KEY
  const [weather, setWeather] = useState(null);
  console.log('api_key', api_key);
  console.log('weather', weather);

  useEffect(() => {
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${countryName}&APPID=${api_key}`)
      .then( response => {
        console.log(response.data);
        setWeather(response.data);
      })
  }, [])

  return (
    <div>
      <h3>Weather in {countryName}</h3>
      { weather &&
      <>
        <h4>temprature: </h4><p> {(weather.main.temp-273.15).toFixed(2)} Celcius</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt={weather.weather[0].main} style={{height:40}} />
        <p>Today's weather is {weather.weather[0].description}</p>
        <h4>wind:</h4><p> speed {weather.wind.speed}, direction {weather.wind.deg}</p>
      </>
      }
    </div>
  )
}

const Country = ({country, onlyCountry}) => { 
  const [visibility, setVisibility] = useState(onlyCountry);
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
        { onlyCountry &&
          <Weather countryName={country.name} />
        }
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
      <Country country={filteredCountries[0]} onlyCountry={true}/>
    )
  }
  
  if( filteredCountries.length > 1 ) {
    return (
      <div>
        { filteredCountries.map( country => (
            <Country key={country.name} country={country} onlyCountry={false}/>
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