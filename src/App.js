import React, { useState, useEffect } from "react"
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/Persons'
import Notification from './components/Notification'
import './message.css'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newPerson, setNewPerson] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [search, setSearch] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        personsService.getAll().then(response => {
            setPersons(response)
        })
    }, [])

    const timedMessage = (timedMessage) => {
        setMessage(timedMessage)
        setTimeout(() => {
            setMessage(null);
        }, 4000);
    }

    const personsToShow = persons.find(person => person.name.toLowerCase().includes(search.toLowerCase())) ? persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())) : []
    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newPerson,
            number: newNumber
        }
        if (persons.filter(person => person.name === newPerson).length === 0) {
            timedMessage(newPerson + " added to phonebook")
            personsService.create(personObject).then(response => {
                setPersons(persons.concat(response))
                setNewPerson('')
                setNewNumber('')
            })
        } else {
            if (window.confirm(`${newPerson} is already added to phonebook. Replace the old number with new one?`)) {

                personsService.update(persons.filter(person => person.name === newPerson)[0].id, personObject).then(response => {
                    console.log("response: ", response)
                    if (response === undefined) {
                        timedMessage("information of " + newPerson + " has already been removed from server")
                    } else {
                        timedMessage("number of " + newPerson + " have been updated")
                        setPersons(persons.map(person => person.id !== response.id ? person : response))
                    }
                })
                setNewPerson('')
                setNewNumber('')
            }
        }
    }

    const handleChange = (state) => {
        return (event) => state(event.target.value)
    }

    const deletePerson = (id) => {
        personsService.remove(id).then(response => {
            setPersons(persons.filter(person => person.id !== id))
            timedMessage("Person " + persons.filter(person => person.id === id)[0].name + " have been deleted from the phonebook")
            console.log(response)
        })
    }

    const iterate = () => {
        return personsToShow.map((person, i) => <li key={i}>{person.name} {person.number} <button onClick={() => { if (window.confirm("Delete " + person.name + "?")) deletePerson(person.id) }}>delete</button></li>)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} />
            <Filter search={search} handleChange={handleChange} setSearch={setSearch} />
            <h2>add a new</h2>
            <PersonForm handleChange={handleChange} addPerson={addPerson} newPerson={newPerson} setNewPerson={setNewPerson} newNumber={newNumber} setNewNumber={setNewNumber} />
            <h2>Numbers</h2>
            <Persons iterate={iterate} />
        </div>
    )
}

export default App  