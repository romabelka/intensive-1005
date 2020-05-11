import {gql} from 'apollo-boost'

export default gql`
    query AllEvents($filter: String) {
        allEvents(filter: $filter) {
            id
            title
        }
    }
`
