import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import uuid from 'uuid/v4'

const createToken = async (id, SECRET) => {
    const token = jwt.sign({ id: id }, SECRET, { expiresIn: '1y' })
    return token
}

export const register = async (args, models) => {
    const { firstName, lastName, email, password } = args

    if(await models.UserModel.findOne({ email })){
        return {
            ok: false,
            errors: [{ message: 'Email is taken' }]
        }
    }

    const hash = await bcrypt.hash(password, 12)
    const id = uuid()

    const user = new models.UserModel({
        id,
        firstName,
        lastName,
        email,
        password: hash,
        photo: 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg',
        online: false
    })
    const friends = new models.FriendsModel({
        id
    })
    
    friends.save()
    user.save()
    return {
        ok: true
    }
}

export const tryLogin = async (email, password, models, SECRET) => {
    const user = await models.UserModel.findOne({ email })
    
    if(!user) {
        return {
            ok: false,
            errors: [{ message: 'Wrong email' }]
        }
    }

    const valid = await bcrypt.compare(password, user.password)
    if(!valid) {
        return {
            ok: false,
            errors: [{ message: 'Wrong password' }]
        }
    }

    const token = await createToken(user.id, SECRET)
    return {
        ok: true,
        token
    }
}
