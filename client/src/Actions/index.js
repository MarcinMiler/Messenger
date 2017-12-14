
export const selectFriend = (channelID, firstName, lastName, online, photo) => ({
    type: 'SELECT_FRIEND',
    channelID, firstName, lastName, online, photo
})

export const updateOnline = online => ({
    type: 'UPDATE_ONLINE',
    online
})