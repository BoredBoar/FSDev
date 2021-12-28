import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = ({newValue, filterChange}) => {
  return (
    <div>
      <label>find countries </label>
      <input value={newValue} onChange={filterChange} />
    </div>
  )
}

const Detail = ({country}) => {
  if(country != null && Object.keys(country).length > 0) {
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div> capital {country.capital ? country.capital[0] : 'N/A'}</div>
        <div> population {country.population}</div>
        <h2>languages</h2>
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

  const handleFilterChange = (event) => {
    var filterVal = event.target.value
    setFilter(filterVal)
    setFilteredCountries(countries.filter(country => {return country.name.common.toLowerCase().includes(filterVal)}))
    showCountry('')
  }

  const showCountry = (commonName) => {
    setDetailView(countries.find(country => {return country.name.common === commonName}))
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
    </div>
  )
}

export default App;
