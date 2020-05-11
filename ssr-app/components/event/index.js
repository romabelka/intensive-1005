import React, {useState} from 'react'
import EventBody from "./event-body";

function Index({ id }) {

    return (
        <div>
            <EventBody id={id}/>
        </div>
    )
}

Index.propTypes = {
}

export default Index
