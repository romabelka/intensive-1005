import {gql} from 'apollo-boost'

export default gql`
    query EventQuery($id: String!) {
        event(id: $id) {
            id
            url
            people {
                email
            }
        }
    }
`
