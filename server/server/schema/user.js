export default `
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        photo: String
        email: String!
        online: Boolean!
    }

    type Query {
        users: [User]
        me: User
    }

    type LoginResponse {
        ok: Boolean!
        token: String
        error: Error
    }

    type Response {
        ok: Boolean!
        error: Error
    }

    type Mutation {
        login(email: String!, password: String!): LoginResponse!
        register(firstName: String!, lastName: String!, email: String!, password: String!): Response!
        updateFirstName(firstName: String!): Response!
        updateLastName(lastName: String!): Response!
        updateEmail(oldEmail: String!, newEmail: String!): Response!
        updatePassword(oldPassword: String!, newPassword: String!): Response!
        updatePhoto(photo: String!): Response!
    }
`