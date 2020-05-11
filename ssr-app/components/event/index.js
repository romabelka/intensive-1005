import React, {useState} from 'react'
import EventBody from "./event-body";

function Index({event}) {
    const [isOpen, setOpen] = useState(false)

    return (
        <div>
            <h4 onClick = {() => setOpen(!isOpen)}>{event.title}</h4>
            {isOpen ? <EventBody event={event}/> : null}
        </div>
    )
}

Index.propTypes = {
}

export default Index
