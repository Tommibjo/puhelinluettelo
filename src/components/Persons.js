import React from 'react'

const Persons = ({iterate}) => {
    return (
        <ul>
            {iterate()}
        </ul>
    )
}

export default Persons