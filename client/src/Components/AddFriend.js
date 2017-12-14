import React, { Component } from 'react'
import styled from 'styled-components'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import { Grid } from 'react-flexbox-grid'
import Plus from 'react-icons/lib/md/close'

class AddFriend extends Component {
    render() {
        console.log(this.props.data)
        const { loading } = this.props.data
        if(loading) {
            return "Loading..."
        }

        const handleClick = async (id) => {
            const mutationResponse = await this.props.addFriend({
                variables: {
                    friendID: id
                }
            })
            console.log(mutationResponse, 'res')
        }

        const users = this.props.data.users.map((user, i) => {
            return(
                <Wrap key={i}>
                    <ProfileImage src={user.photo} />
                    <Name>{ user.firstName } { user.lastName }</Name>
                    <StyledPlus onClick={() => handleClick(user.id)} />
                </Wrap>
            )
        })

        return(
            <Grid>
                {
                    users
                }
            </Grid>
        )
    }
}

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
const AddFriendMutation = gql`
    mutation addFriend($friendID: ID!) {
        addFriend(friendID: $friendID)
    }
`

export default compose(
    graphql(usersQuery),
    graphql(AddFriendMutation, { name: 'addFriend' })
)(AddFriend)

const Wrap = styled.div`
    width: 100%;
    height: 70px;
    border-bottom: 1px solid lightgray;
    clear: both;
`
const ProfileImage = styled.img`
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid black;
    float: left;
    object-fit: cover;
`
const Name = styled.p`
    margin: 20px 0 0 70px;
`
const StyledPlus = styled(Plus)`
    transform: rotate(45deg);
    float: right;
    font-size: 24px;
    cursor: pointer;
`
