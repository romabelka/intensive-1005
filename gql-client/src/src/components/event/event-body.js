import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import eventQuery from '../../queries/event'
import EventTitleForm from './event-title-form'


function EventBody({event}) {
    const {data, loading} = useQuery(eventQuery, { variables: { id: event.id }})

    if (!data || loading) return <h3>Loading...</h3>

    return (
        <div>
            <a href={data.event.url}>{data.event.url}</a>
            <div>
                {data.event.people && data.event.people.map(p => p.email).join(';')}
            </div>
            <EventTitleForm event={event}/>
        </div>
    )
}

EventBody.propTypes = {
}

export default EventBody
