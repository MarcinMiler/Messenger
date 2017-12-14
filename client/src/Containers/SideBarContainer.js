import React, { Component } from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import { updateOnline, selectFriend } from '../Actions'

import SideBar from '../Components/SideBar'
import UserModal from '../Components/UserModal'
import FriendsModal from '../Components/FriendsModal'

class SideBarContainer extends Component {

    state = {
        sub: false,
        selectFriend: false,
        userModalOpen: false,
        friendsModalOpen: false,

        buttons: ['First Name', 'Last Name', 'Email', 'Password', 'Photo'],
        active: 'First Name',
        firstName: '',
        lastName: '',
        oldEmail: '',
        newEmail: '',
        oldPassword: '',
        newPassword: '',
        photo: ''
    }

    componentDidMount() {
        if(!this.state.sub) {
            this.subscribe()
            this.setState({ sub: true })
        }
    }

    handleChangeState = (key, value) => this.setState({ [key]: value }) 

    toggleUserModel = () => {
        this.setState({ userModalOpen: !this.state.userModalOpen })
    }

    toggleFriendsModel = () => {
        this.setState({ friendsModalOpen: !this.state.friendsModalOpen })
    }

    subscribe = () => {
        this.props.friends.subscribeToMore({
            document: onlineSubscription,
            variables: {
                id: this.props.me.id
            },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.onlineSub) return prev
                let subData = subscriptionData.onlineSub
                const query = gql`
                    {
                        friends {
                            id,
                            firstName,
                            lastName,
                            photo,
                            channelID,
                            online
                        }
                    }
                `
                let data = this.props.client.readQuery({
                    query
                })
                let index
                for(let i = 0; i < data.friends.length; i++) {
                    if(data.friends[i].id === subData.id) {
                        index = i
                    }
                }
                data.friends[index].online = subData.online
                this.props.updateOnline(subData.online)                

              return Object.assign({}, prev, {
                  friends: [...data.friends]
              })
            }
          })
    }

    addFriends = async (id) => {
        const res = await this.props.addFriend({
            variables: {
                friendID: id
            },
            update: (store, { data: { addFriend } }) => {
                const query = gql`
                    {
                        friends {
                            id,
                            firstName,
                            lastName,
                            photo,
                            channelID,
                            online
                        }
                    }
                `
                let data = store.readQuery({
                    query
                })
                data.friends.push(addFriend)
                store.writeQuery({
                    query,
                    data
                })
            }
        })
    }

    render() {
        const { firstName, lastName, oldEmail, newEmail, oldPassword, newPassword, photo } = this.state
        const query = gql`
            {
                me {
                    id,
                    firstName,
                    lastName,
                    email,
                    photo,
                }
            }
        `
        const updateFirstName = async () => {
            const res = await this.props.updateFirstName({
                variables: { firstName },
                optimisticResponse: {
                    updateFirstName: {
                      __typename: 'Mutation',
                      ok: true,
                      errors: null
                    },
                  },
                update: (store, { updateFirstName }) => {
                    let data = store.readQuery({ query })
                    data.me.firstName = firstName
                    store.writeQuery({
                        query,
                        data
                    })
                }
            })
        }
        const updateLastName = async () => {
            const res = await this.props.updateLastName({
                variables: { lastName },
                optimisticResponse: {
                    updateLastName: {
                      __typename: 'Mutation',
                      ok: true,
                      errors: null
                    },
                  },
                update: (store, { updateLastName }) => {
                    let data = store.readQuery({ query })
                    data.me.lastName = lastName
                    store.writeQuery({
                        query,
                        data
                    })
                }
            })
        }
        const updateEmail = async () => {
            const res = await this.props.updateEmail({ variables: { oldEmail , newEmail } })
            console.log(res, 'res')
        }
        const updatePassword = async () => {
            const res = await this.props.updatePassword({ variables: { oldPassword, newPassword } })
            console.log(res, 'res')
        }
        const updatePhoto = async () => {
            const res = await this.props.updatePhoto({
                variables: { photo },
                optimisticResponse: {
                    updatePhoto: {
                      __typename: 'Mutation',
                      ok: true,
                      errors: null
                    },
                  },
                update: (store, { updatePhoto }) => {
                    let data = store.readQuery({ query })
                    data.me.photo = photo
                    store.writeQuery({
                        query,
                        data
                    })
                }
            })
        }

        const { friends } = this.props.friends
        const { users } = this.props.users
        if(this.props.friends.loading) return ""
        if(this.props.users.loading) return ""

        return (
            <div>
                { friends && <SideBar friends={friends} firstName={this.props.me.firstName} lastName={this.props.me.lastName} openUserModal={this.toggleUserModel} openFriendsModal={this.toggleFriendsModel} />}
                <UserModal
                    onClose={this.toggleUserModel}
                    open={this.state.userModalOpen}
                    me={this.props.me}
                    state={this.state}
                    handleChangeState={this.handleChangeState}
                    updateFirstName={updateFirstName}
                    updateLastName={updateLastName}
                    updateEmail={updateEmail}
                    updatePassword={updatePassword}
                    updatePhoto={updatePhoto}
                />
                { users && <FriendsModal
                        onClose={this.toggleFriendsModel}
                        open={this.state.friendsModalOpen}
                        friends={users}
                        addFriends={this.addFriends}
                    />
                }
            </div>
        )
    }
}

const friendsQuery = gql`
    query friends {
        friends {
            id,
            firstName,
            lastName,
            photo,
            channelID,
            online
        }
    }
`
const usersQuery = gql`
    query users {
        users {
            id,
            firstName,
            lastName,
            photo
        }
    }
`
const addFriendMutation = gql`
    mutation addFriend($friendID: ID!) {
        addFriend(friendID: $friendID) {
            firstName,
            lastName,
            id,
            photo,
            online,
            channelID
        }
    }
`
const updateFirstNameMutation = gql`
    mutation updateFirstName($firstName: String!) {
        updateFirstName(firstName: $firstName) {
            ok,
            errors {
                message
            }
        }
    }
`
const updateLastNameMutation = gql`
    mutation updateLastName($lastName: String!) {
        updateLastName(lastName: $lastName) {
            ok,
            errors {
                message
            }
        }
    }
`
const updateEmailMutation = gql`
    mutation updateEmail($oldEmail: String!, $newEmail: String!) {
        updateEmail(oldEmail: $oldEmail, newEmail: $newEmail) {
            ok,
            errors {
                message
            }
        }
    }
`
const updatePasswordMutation = gql`
    mutation updatePassword($oldPassword: String!, $newPassword: String!) {
        updatePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
            ok,
            errors {
                message
            }
        }
    }
`
const updatePhotoMutation = gql`
    mutation updatePhoto($photo: String!) {
        updatePhoto(photo: $photo) {
            ok,
            errors {
                message
            }
        }
    }
`
const onlineSubscription = gql`
    subscription onlineSub($id: ID!) {
        onlineSub(id: $id) {
            online,
            id
        }
    }
`

const WithData = compose(
    graphql(friendsQuery, { name: 'friends'}),
    graphql(usersQuery, { name: 'users'}),
    graphql(addFriendMutation, { name: 'addFriend' }),
    graphql(updateFirstNameMutation, { name: 'updateFirstName'}),
    graphql(updateLastNameMutation, { name: 'updateLastName' }),
    graphql(updateEmailMutation, { name: 'updateEmail' }),
    graphql(updatePasswordMutation, { name: 'updatePassword' }),
    graphql(updatePhotoMutation, { name: 'updatePhoto' }),
    withApollo
)(SideBarContainer)

export default connect(null, { updateOnline, selectFriend })(WithData)
