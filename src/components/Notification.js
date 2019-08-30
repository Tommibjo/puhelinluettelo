import React from 'react'


const Notification = ({ message }) => {
    console.log("Message: ", message)
    if (message === null) {
        return (
            <div></div>
        )
    } else {
        return (
            <div className="message">
                {message}
            </div>
        )
    }
}

export default Notification