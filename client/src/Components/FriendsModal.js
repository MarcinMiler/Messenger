import React, { Component } from 'react'
import { graphql, compose, withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import styled, { keyframes } from 'styled-components'
import { Button, Header, Icon, Image, Modal, Item } from 'semantic-ui-react'
import Plus from 'react-icons/lib/md/add-circle-outline'

const FriendsModal = ({
    open,
    onClose,
    friends,
    addFriends
}) => (
    <Modal
        open={open}
        onClose={onClose}
        size='small'
    >
        <Modal.Header>List Of Users</Modal.Header>
        <Modal.Content image scrolling>   
            <Modal.Description>
                <Header>Add Friends</Header>
                <Item.Group divided>
                    {
                        friends.map(f => (
                            <Item key={ f.id }>
                                <Item.Image size='tiny' src={ f.photo } />
                                <Item.Content verticalAlign='middle'>
                                    <Item.Header>{ f.firstName } { f.lastName }</Item.Header>
                                    <StyledIconPlus onClick={() => addFriends(f.id) } />
                                </Item.Content>
                            </Item>
                        ))
                    }
                </Item.Group>
            </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button onClick={onClose} inverted color='red'>Close</Button>
        </Modal.Actions>
    </Modal>
)

export default FriendsModal

const StyledIconPlus = styled(Plus)`
    color: black;
    font-size: 32px;
    display: inline-block;
    margin: -5px 10px 0 0;
    cursor: pointer;
    float: right;
    transition: all 300ms ease-out;

    &:hover {
        transform: scale(1.2) rotate(-180deg);
    }
`
