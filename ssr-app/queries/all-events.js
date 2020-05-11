import gql from 'graphql-tag'

export default gql`
    query AllEvents($filter: String) {
        allEvents(filter: $filter) {
            id
            title
        }
    }
`
