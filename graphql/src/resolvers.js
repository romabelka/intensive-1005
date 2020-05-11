const eventsMap = require('../mocks/events')
const people = require('../mocks/people')

const resolvers = {
    Query: {
        allEvents: (_, { filter }) => {
            return makeAsync(filter
                ? Object.values(eventsMap).filter(event => event.title.includes(filter))
                : Object.values(eventsMap)
            )
        },
        event: (_, { id }) => makeAsync(eventsMap[id])
    },
    Mutation: {
        renameEvent: (_, { id, title }) => {
            eventsMap[id].title = title
            return makeAsync(eventsMap[id])
        }
    },
    Event: {
        id: (obj) => obj._id,
        people: (obj) => makeAsync(people.filter(person => obj.peopleIds && obj.peopleIds.includes(person._id)), 500)
    },
    Person: {
        id: (obj) => obj._id
    }
};

function makeAsync(data, timeout = 1000) {
    return new Promise((resolve) => setTimeout(() => resolve(data), timeout))
}

module.exports = resolvers
