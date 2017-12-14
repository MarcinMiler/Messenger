import uuid from 'uuid/v4'
import { PubSub, withFilter } from 'graphql-subscriptions'

const pubsub = new PubSub()

export default {
    Query: {
        friends: async (parent, args, { models, user }) => {
            let u = await models.FriendsModel.find({ id: user.id }, 'friends')
            
            let listOfIDs = u[0].friends.map(f => f.friendID)
            let listOfChannels = u[0].friends.map(f => f.channelID)
            
            let friends = await models.UserModel.find({}, 'id firstName lastName photo online').where('id').in(listOfIDs)
            let response = friends.map((f, i) => Object.assign({}, f.toObject(), { channelID: listOfChannels[i] }))

            return response
        }
    },
    Mutation: {
        isOnline: async(parent, { online }, { models, user }) => {
            const u = await models.UserModel.findOne({ id: user.id })
            
            const f = await models.FriendsModel.findOne({ id: user.id })
            const ids = f.friends.map(ff => ff.friendID)

            const response = { online, id: user.id}
            pubsub.publish('online', { ids, response, f })

            await models.UserModel.update({ id: user.id }, { online })

            return online 
        },
        addFriend: async (parent, { friendID }, { models, user }) => {
            
            const f1 = await models.FriendsModel.findOne({ id: user.id })
            
            if(f1.friends.find(u => u.id === friendID)){
                return {}
            }

            const f2 = await models.FriendsModel.findOne({ id: friendID })
            const channelID = uuid()

            const newF = {
                friendID,
                channelID
            }
            const newF2 = {
                friendID: user.id,
                channelID
            }
            const newChannel = new models.ChannelsModel({
                id: channelID,
                messages: []
            })

            await models.FriendsModel.update({ id: user.id }, { $push: { friends: newF }})
            await models.FriendsModel.update({ id: friendID }, { $push: { friends: newF2 }})
            await newChannel.save()
            
            const ff = await models.UserModel.findOne({ id: friendID }, 'id firstName lastName photo online')
            const fff = Object.assign({}, ff.toObject(), { channelID })

            return fff
        }
    },
    Subscription: {
        onlineSub: {
            resolve: async (payload, args) => {
                const r = payload.ids.find(id => id === args.id)
                if(r) return payload.response
            },
            subscribe: () => pubsub.asyncIterator('online')
        }
    }
}