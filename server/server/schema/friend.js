export default `
    type Friend {
        id: ID!
        firstName: String!
        lastName: String!
        photo: String
        channelID: String!
        online: Boolean
    }

    type Query {
        friends: [Friend]
    }

    type OnlineResponse {
        online: Boolean!
        id: ID!
    }
    
    type Mutation {
        isOnline(online: Boolean!): Boolean!
        addFriend(friendID: ID!): Friend!
    }

    type Subscription {
        onlineSub(id: ID!): OnlineResponse
    }
`