import gql from 'graphql-tag'

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
