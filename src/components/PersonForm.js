import React from 'react'

const PersonForm = ({handleChange, addPerson, newPerson, setNewPerson, newNumber, setNewNumber}) => {

    return (
        <form onSubmit={addPerson}>
            <div>
                name: <input value={newPerson} onChange={handleChange(setNewPerson)} />
            </div>
            <div>
                number: <input value={newNumber} onChange={handleChange(setNewNumber)} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm