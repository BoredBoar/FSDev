import React, { useState } from 'react'

const Filter = ({serch}) => {
  return (
    <div>
      <label>filter shown with </label>
      <input value={newFilter} onChange={handleFilterChange} />
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
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
    setNewFilter(event.target.value)
    setNewList(persons.filter(person => (person.name.toLowerCase().startsWith(event.target.value.toLowerCase()))))
  }

  const PersonForm = () => {
    return (
      <div>
        <form onSubmit={addPerson}>
          <div>
            name: <input value={newName} onChange={handleNameChange} />
          </div>
          <div>
            number: <input value={newNumber} onChange={handleNumberChange} />
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

  const Persons = () => {
    return (
      <div>
        {filteredList.map(person => 
          <Person key={person.id} person={person} />
        )}
      </div>
    )
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter />
      <h3>Add a new</h3>
      <PersonForm />
      <h3>Numbers</h3>
      <Persons />
    </div>
  )
}

export default App