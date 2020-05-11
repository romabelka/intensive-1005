import { withApollo } from '../lib/apollo'
import Event from "../components/event";

const EventPage = ({ id }) => {
    return (
        <div>
            <h1>Event Page {id}</h1>
            <Event id={id}/>
        </div>
    )
}

EventPage.getInitialProps = async ({ query }) => {
    //await fetch event by id
    // return { event }
    return { id: query.id }
}

export default withApollo({ ssr: true })(EventPage)
