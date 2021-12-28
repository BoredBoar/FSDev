import React, { useState, useEffect } from 'react'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY
console.log('api:', api_key)

const Search = ({newValue, filterChange}) => {
  return (
    <div>
      <label>find countries </label>
      <input value={newValue} onChange={filterChange} />
    </div>
  )
}

const Weather = ({weather}) => {
  const degreeToDirection = (degrees) => {
    var direction = 'N/A'
    if(degrees => 348.75 || degrees < 11.25) {direction = 'N'}
    else if(degrees => 11.25 && degrees < 33.75) {direction = 'NNE'}
    else if(degrees > 33.75 && degrees < 56.25) {direction = 'NE'}
    else if(degrees > 56.25 && degrees < 78.75) {direction = 'ENE'}
    else if(degrees > 78.75 && degrees < 101.25 ) {direction = 'E'}
    else if(degrees > 101.25 && degrees < 123.75 ) {direction = 'ESE'}
    else if(degrees > 123.75 && degrees < 146.25 ) {direction = 'SE'}
    else if(degrees > 146.25 && degrees < 168.75 ) {direction = 'SSE'}
    else if(degrees > 168.75 && degrees < 191.25  ) {direction = 'S'}
    else if(degrees > 191.25 && degrees < 213.75 ) {direction = 'SSW'}
    else if(degrees > 213.75 && degrees < 236.25 ) {direction = 'SW'}
    else if(degrees > 236.25 && degrees < 258.75 ) {direction = 'WSW'}
    else if(degrees > 258.75 && degrees < 281.25 ) {direction = 'W'}
    else if(degrees > 281.25 && degrees < 303.75 ) {direction = 'WNW'}
    else if(degrees > 303.75 && degrees < 326.25 ) {direction = 'NW'}
    else if(degrees > 326.25 && degrees < 348.75 ) {direction = 'NNW'}
    return direction
  }

  if(weather != null && Object.keys(weather).length > 0) {
    return(
      <div>
        <h2>Weather in {weather.name}</h2>
        <div><strong>temperature: </strong> {(weather.main.temp - 273.15).toFixed()}</div>
        <div><img src={'http://openweathermap.org/img/wn/' + weather.weather[0].icon +'@2x.png'} alt='Weather Icon' width="100"></img></div>
        <div><strong>wind:</strong> {weather.wind.speed.toFixed()} m/s direction {degreeToDirection(weather.wind.deg)} </div>
      </div>
    )
  }
  return (
    <div></div>
  )
}

const Detail = ({country}) => {
  if(country != null && Object.keys(country).length > 0) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div> capital {country.capital ? country.capital[0] : 'N/A'}</div>
        <div> population {country.population}</div>
        <h2>Spoken languages</h2>
        <ul>
          {Object.keys(country.languages).map(lang => 
            <li key={country.languages[lang]}>{country.languages[lang]}</li>
          )}
        </ul>
        <img src={country.flags.png} alt='Flag' width="200"></img>


      </div>
    )
  }
  return (
    <div></div>
  )
}

const Results = ({countries, showCountry}) => {
  if(countries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if(countries.length > 1){    
    return (
      <div>
        {countries.map(country => 
          <div key={country.name.common}>
            <label >{country.name.common} </label>
            <button onClick={() => showCountry(country.name.common)} >show</button>
          </div>
        )}
      </div>
    )
  } else if(countries.length === 0) {
    return (
      <div>No results found, specify another filter</div>
    )
  } else {
    showCountry(countries[0].name.common)
    return(
      <div></div>
    )
  }
}

function App() {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [detailView, setDetailView] = useState({})
  const [weatherDetail, setWeatherDetail] = useState({})

  const handleFilterChange = (event) => {
    var filterVal = event.target.value
    setFilter(filterVal)
    setFilteredCountries(countries.filter(country => {return country.name.common.toLowerCase().includes(filterVal)}))
    showCountry('')
  }

  const showCountry = (commonName) => {
    const countryObj = countries.find(country => {return country.name.common === commonName}) || {}
    setDetailView(countryObj)
    if(countryObj.capital) {
      axios
        .get('https://api.openweathermap.org/data/2.5/weather?q=' + countryObj.capital[0] + '&units=metric&appid=' + api_key)
        .then(response => {
          setWeatherDetail(response.data)
        })
    } else {
      setWeatherDetail({})
    }
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
      <h1>Countries</h1>
      <Search newValue={filter} filterChange={handleFilterChange} />
      <Results countries={filteredCountries} detail={detailView} showCountry={showCountry} />
      <Detail country={detailView} />
      <Weather weather={weatherDetail} />
    </div>
  )
}

export default App;
