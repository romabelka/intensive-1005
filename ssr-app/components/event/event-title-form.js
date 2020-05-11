import React, {useState} from 'react'
import {useMutation} from '@apollo/react-hooks'
import renameMutation from '../../queries/rename-event-mutation'

function EventTitleForm({ event }) {
    const [title, setTitle] = useState(event.title)
    const [rename, { loading }] = useMutation(renameMutation, {
        variables: {
            id: event.id,
            title
        },
        optimisticResponse: {
            renameEvent: {"id": event.id, "title":title, "__typename":"Event"}
        }
    })

    const handleSubmit = ev => {
        ev.preventDefault()
        rename()
    }

    if (loading) return <h3>Renaming...</h3>

    return (
        <form onSubmit={handleSubmit}>
            new title: <input value={title} onChange={ev => setTitle(ev.target.value)}/>
            <button type="submit">Rename</button>
        </form>
    )
}

EventTitleForm.propTypes = {
}

export default EventTitleForm
