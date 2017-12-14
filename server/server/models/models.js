import mongoose from 'mongoose'

const Schema = mongoose.Schema

const MessageSchema = new Schema({
    id: String,
    text: String,
    author: String,
})

const ChannelsSchema = new Schema({
    id: String,
    messages: [MessageSchema]
})

const UserSchema = new Schema({
    id: String,
    firstName: String,
    lastName: String,
    photo: String,
    email: String,
    password: String,
    online: Boolean,
})
const fSchema = new Schema({
    friendID: String,
    channelID: String
})
const FriendsSchema = new Schema({
    id: String,
    friends: [fSchema]
})

const MessageModel = mongoose.model('messages', MessageSchema)
const ChannelsModel = mongoose.model('channels', ChannelsSchema)
const UserModel = mongoose.model('user', UserSchema)
const FriendsModel = mongoose.model('friends', FriendsSchema)

const models = {
    MessageModel,
    ChannelsModel,
    UserModel,
    FriendsModel
}

export default models