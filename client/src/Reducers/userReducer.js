
const initialState = {
    channelID: 'd7b3f113-5ad2-46b1-859b-5c086c8f0d18',
    firstName: '',
    lastName: '',
    online: false,
    photo: 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg'
}

const user = (state = initialState, action) => {
    switch(action.type) {

        case "SELECT_FRIEND":
            const { channelID, firstName, lastName, online, photo } = action
            return Object.assign({}, state, { channelID, firstName, lastName, online, photo })

        case "UPDATE_ONLINE":
            return Object.assign({}, state, { online: action.online })

        default:
            return state
    }
}

export default user