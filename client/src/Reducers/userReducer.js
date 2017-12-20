
const initialState = {
    channelID: '6abd4376-f299-4960-8726-6572431a7759',
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