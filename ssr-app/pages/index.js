import { withApollo } from '../lib/apollo'
import EventList from "../components/event-list";

const IndexPage = () => (
  <div>
      <h1>Events App</h1>
      <EventList/>
  </div>
)

export default withApollo({ ssr: true })(IndexPage)
