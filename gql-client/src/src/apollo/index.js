import ApolloClient, { gql } from 'apollo-boost'


const apolloClient = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
})

window.gql = gql
window.apolloClient = apolloClient

export default apolloClient
