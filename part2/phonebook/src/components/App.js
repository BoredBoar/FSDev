import React, { useState, useEffect } from 'react'
import phonebookService from '../services/phonebook'


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

const Person = ({ person, removePerson }) => {
  return (
    <div>
      <label>{person.name} {person.number} </label>
      <button onClick={() => removePerson(person.id)}>delete</button>
    </div>
  )
}

const Persons = ({list, handleRemove}) => {
  return (
    <div>
      {list.map(person => 
        <Person key={person.id} person={person} removePerson={handleRemove} />
      )}
    </div>
  )
}

const Notification = ({message}) => {
  if(message === null) {
    return null
  }

  return (
    <div className={message.type}>
      {message.msg}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filteredList, setNewList] = useState(persons)
  const [notifyMessage, setNotifyMessage] = useState(null)

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.filter(person => person.name.toLowerCase() === newName.toLowerCase()).length === 0) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      phonebookService.create(newPerson).then(res => {
        setPersons(persons.concat(res))
        setNewNumber('')
        setNewName('')
        updateFilter(newFilter,persons.concat(res))
        setNotifyMessage({msg: `Added ${res.name}`, type: 'success'})
        setTimeout(() => {setNotifyMessage(null)}, 5000)
      }).catch(err => {
        setNotifyMessage({msg: err.response.data.error, type: 'error'})
        setTimeout(() => {setNotifyMessage(null)}, 5000)
        console.log(`Error received: ${err.response.data.error}`)
      })
    } else {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        const tmp = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        phonebookService.update({...tmp, name: newName, number: newNumber})
          .then(res => {
            setPersons(persons.filter(person => person.id !== tmp.id).concat(res))
            updateFilter(newFilter,persons.filter(person => person.id !== tmp.id).concat(res))
          })
          .catch(err => {
            setNotifyMessage({msg: err.response.data.error, type: 'error'})
            setTimeout(() => {setNotifyMessage(null)}, 5000)
          })
      }
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
    updateFilter(event.target.value,persons)
  }

  const updateFilter = (val,list) => {
    setNewList(list.filter(person => (person.name.toLowerCase().startsWith(val.toLowerCase()))))
  }

  const handleRemoveClick = id => {
    if(window.confirm(`Delete ${persons.find(person => person.id === id).name}`)) {
      phonebookService.remove(id).then(res => {
        setPersons(persons.filter(person => person.id !== id))
        updateFilter(newFilter,persons.filter(person => person.id !== id))
      }).catch(err => {
        setNotifyMessage({msg: err.response.data.error, type: 'error'})
        setTimeout(() => {setNotifyMessage(null)}, 5000)
      })
    }
  }

  useEffect(() => {
    console.log('effect')
    phonebookService.getAll().then(results => {
      setPersons(results)
      updateFilter(newFilter,results)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifyMessage} />
      <Filter handleFilterChange={handleFilterChange} newValue={newFilter} />
      <h3>Add a new</h3>
      <PersonForm submitPerson={addPerson} updatedName={newName} 
          updatedNumber={newNumber} nameChange={handleNameChange} numberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons list={filteredList} handleRemove={handleRemoveClick} />
    </div>
  )
}

export default App