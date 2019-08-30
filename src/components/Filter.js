import React from 'react'

const Filter = ({search, handleChange, setSearch}) => {
    return(
        <div>
        filter shown with <input value={search} onChange={handleChange(setSearch)}/>
        </div>
    )
}

export default Filter