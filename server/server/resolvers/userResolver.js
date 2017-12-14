import { tryLogin, register } from '../auth.js'
import bcrypt from 'bcrypt'

export default {
    Query: {
        users: async (parent, args, { models }) => await models.UserModel.find({}, 'id firstName lastName photo friends email'),
        me: async (parent, args, { models, user }) => {
            const u = await models.UserModel.findOne({ id: user.id }, 'id firstName lastName photo friends email')
            return u
        }
    },
    Mutation: {
        login: async (parent, { email, password }, { models, SECRET }) => await tryLogin(email, password, models, SECRET),

        register: async (parent, args, { models }) => await register(args, models),

        updateFirstName: async (parent, { firstName }, { models, user }) => {
            const u = await models.UserModel.findOne({ id: user.id })
            await models.UserModel.update({ id: user.id }, { firstName })
            return {
                ok: true
            }
        },
        updateLastName: async (parent, { lastName }, { models, user }) => {
            const u = await models.UserModel.findOne({ id: user.id })
            await models.UserModel.update({ id: user.id }, { lastName })
            return {
                ok: true
            }
        },
        updateEmail: async (parent, { oldEmail, newEmail }, { models, user }) => {
            const u = await models.UserModel.findOne({ id: user.id })
            const checkEmail = await models.UserModel.findOne({ email: newEmail })
            if(checkEmail) return { ok: false, errors: [{ message: 'Email is taken' }]}
            await models.UserModel.update({ id: user.id }, { email: newEmail })
            return {
                ok: true
            }
        },
        updatePassword: async (parent, { oldPassword, newPassword }, { models, user }) => {
            const u = await models.UserModel.findOne({ id: user.id })
            const valid = await bcrypt.compare(oldPassword, u.password)
            if(!valid) return { ok: false, errors: [{ message: 'Password dont match' }]}
            const hash = await bcrypt.hash(newPassword, 12)
            await models.UserModel.update({ id: user.id }, { password: hash })
            return {
                ok: true
            }
        },
        updatePhoto: async (parent, { photo }, { models, user }) => {
            const u = await models.UserModel.findOne({ id: user.id })
            await models.UserModel.update({ id: user.id }, { photo })
            return {
                ok: true
            }
        },
    },
}