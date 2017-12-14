export default `
    type Channel {
        id: String!,
        messages: [Message]
    }

    type Query {
        channel(channelID: ID!): Channel
    }

    type Mutation {
        addMessage(channelID: ID! text: String! author: ID!): Message!
    }

    type Subscription {
        messageAdded(channelID: ID): Message
    }
`