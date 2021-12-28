import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({handleFilterChange,newValue}) => {
  return (
    <div>
      <label>filter shown with </label>
      <input value={newValue} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = ({submitPerson, updatedName, updatedNumber, nameChange, numberChange}) => {
  return (
    <div>
      <form onSubmit={submitPerson}>
        <div>
          name: <input value={updatedName} onChange={nameChange} />
        </div>
        <div>
          number: <input value={updatedNumber} onChange={numberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const Person = ({ person }) => {
  return (
    <div>{person.name} {person.number}</div>
  )
}

const Persons = ({list}) => {
  return (
    <div>
      {list.map(person => 
        <Person key={person.id} person={person} />
      )}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '040-123456', id: 1 },
    // { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    // { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    // { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filteredList, setNewList] = useState(persons)

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.filter(person => person.name === newName).length === 0) {
      const newPerson = {
        name: newName,
        id: persons.length + 1,
        number: newNumber
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
      updateFilter(newFilter,persons.concat(newPerson))
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    var filterVal = event.target.value
    setNewFilter(filterVal)
    // setNewList(persons.filter(person => (person.name.toLowerCase().startsWith(event.target.value.toLowerCase()))))
    updateFilter(event.target.value,persons)
  }

  const updateFilter = (val,list) => {
    setNewList(list.filter(person => (person.name.toLowerCase().startsWith(val.toLowerCase()))))
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        updateFilter('',response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} newValue={newFilter} />
      <h3>Add a new</h3>
      <PersonForm submitPerson={addPerson} updatedName={newName} 
          updatedNumber={newNumber} nameChange={handleNameChange} numberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons list={filteredList} />
    </div>
  )
}

export default App