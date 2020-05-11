import React, {useState} from 'react'
import {useQuery} from '@apollo/react-hooks'
import allEventsQuery from '../queries/all-events'

function EventList() {
    const [filter, setFilter] = useState('')
    const { data, loading } = useQuery(allEventsQuery, { variables: { filter }})

    if (!data || loading) return <h3>Loading...</h3>

    return (
        <div>
            <input value={filter} onChange={ev => setFilter(ev.target.value)}/>
            <ul>
                {data.allEvents.map(event =>
                    <li key={event.id}>{event.title}</li>
                )}
            </ul>
        </div>
    )
}

EventList.propTypes = {
}

export default EventList
