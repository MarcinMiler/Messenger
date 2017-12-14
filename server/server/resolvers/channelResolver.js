import uuid from 'uuid/v4'
import { PubSub, withFilter } from 'graphql-subscriptions'

export const pubsub = new PubSub()

export default {
    Query: {
        channel: async (parent, { channelID }, { models }) => await models.ChannelsModel.findOne({ id: channelID })
    },
    Mutation: {
        addMessage: async (parent, { channelID, text, author }, { models, user }) => {
            const newMessage = new models.MessageModel({
                id: uuid(),
                text,
                author
            })
            console.log(channelID, 'chanelIDDDD')
            const o = Object.assign({}, newMessage.toObject(), { channelID })
            pubsub.publish('messageAdded', o)
            await models.ChannelsModel.update({ id: channelID }, { $push: { messages: newMessage}})
            return newMessage
        }
    },
    Subscription: {
        messageAdded: {
            // subscribe: withFilter(() => pubsub.asyncIterator('messageAdded'), payload => payload),
            resolve: (payload, args) => {
                console.log(payload.channelID === args.channelID)
                if(payload.channelID === args.channelID) return payload
            },
            subscribe: () => pubsub.asyncIterator('messageAdded')
          }
    }
}