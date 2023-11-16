import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import { useEffect, useState } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageTimer, setMessageTimer] = useState(null)

  useEffect(() => {
    // fetch('http://localhost:3001/persons')
    //   .then((response) => response.json())
    //   .then((data) => setPersons(data))

    personService.getAll().then((initialPersons) => setPersons(initialPersons))
  }, [])

  const showMessage = (content, type) => {
    clearTimeout(messageTimer)
    setMessage({ content, type })
    // hide notification at 5 seconds after rendering
    const newTimer = setTimeout(() => setMessage(null), 5000)
    setMessageTimer(newTimer)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const existed = (e) => e.name === newName

    if (persons.some(existed)) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        const person = persons.find((p) => p.name === newName)
        const changedPerson = { ...person, number: newNumber }

        personService
          .update(person.id, changedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== person.id ? p : returnedPerson))
            )
            showMessage(`Updated ${returnedPerson.name}`, 'success')
            // setMessage({
            //   content: `Updated ${returnedPerson.name}`,
            //   type: 'success',
            // })
          })
          .catch(() => {
            setPersons(persons.filter((p) => p.id !== person.id))
            showMessage(
              `Information of ${person.name} has already been removed from server`,
              'error'
            )
            // setMessage({
            //   content: `Information of ${person.name} has already been removed from server`,
            //   type: 'error',
            // })
          })
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')

        showMessage(`Added ${returnedPerson.name}`, 'success')
        // setMessage({
        //   content: `Added ${returnedPerson.name}`,
        //   type: 'success',
        // })
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id).then(() => {
        setPersons(persons.filter((p) => p.id !== person.id))
        showMessage(`Deleted ${person.name}`, 'success')
        // setMessage({
        //   content: `Deleted ${person.name}`,
        //   type: 'success',
        // })
      })
    }
  }

  const personsToShow = persons.filter((person) =>
    person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDelete={deletePerson} />
    </div>
  )
}

export default App
