import React, { Component } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Messages from '../Components/Messages'
import BottomNav from '../Components/BottomNav'

class MessagesContainer extends Component {

    componentWillMount() {
        this.unsubscribe = this.subscribe(this.props.friend.channelID)
    }
    
    componentWillReceiveProps(newProps) {
        if(newProps.friend.channelID !== this.props.friend.channelID) {

            if (this.unsubscribe) this.unsubscribe()

            this.unsubscribe = this.subscribe(newProps.friend.channelID)
        }
    }

    componentWillUnmount() {
        if (this.unsubscribe) this.unsubscribe()
    }

    subscribe = channelID => {
        return this.props.data.subscribeToMore({
            document: messagesSubscription,
            variables: {
                channelID
            },
            updateQuery: (prev, { subscriptionData }) => {
                if (!subscriptionData.messageAdded) {
                    return prev
                }
                const newMessage = subscriptionData.messageAdded
                console.log(subscriptionData,  'sub')
                return Object.assign({}, prev, {
                    channel: {
                        ...prev.channel,
                        messages: [...prev.channel.messages, newMessage]
                    }
                }) 
            }
        })
    }

    render() {
        if(this.props.data.loading) {
            return(
                <Some>
                    <Header>
                        <HeaderP>{ this.props.friend.firstName } { this.props.friend.lastName }</HeaderP>
                        <HeaderP>{ this.props.friend.online ? <span>online</span> : <span>offline</span> }</HeaderP>
                    </Header>
            
                    <Channel></Channel>
            
                    <BottomNav />
            
                </Some>
            )
        }
        let m
        if(this.props.data.channel) {
            m = this.props.data.channel.messages
        } else m = [{ id: '129hfsdb', text: 'Add friends', author:'asdj87gbiasd'}]

        return <Messages messages={m} me={this.props.me} friend={this.props.friend} />
    }
}

const channelQuery = gql`
    query channel($channelID: ID!) {
        channel(channelID: $channelID) {
            id,
            messages {
                id,
                text,
                author
            }
        }
    }
`
const messagesSubscription = gql`
    subscription messageAdded($channelID: ID!) {
        messageAdded(channelID: $channelID) {
            id,
            text,
            author,
            channelID
        }
    }
`
const mapStateToProps = state => ({
    friend: state.users
})

const WithData = graphql(channelQuery, {
    options: props => ({
        variables: {
            channelID: props.friend.channelID
        },
        fetchPolicy: 'network-only'
    })
})(MessagesContainer)

export default connect(mapStateToProps, null)(WithData)

const Some = styled.div`
    width: calc(100% - 300px);
    height: 100%;
`
const Header = styled.div`
    width: 100%;
    height: 80px;
    background-image: linear-gradient(to right, #2A405F 0%, #324B69 100%);
    box-sizing: border-box;
    padding: 27px;
`
const HeaderP = styled.p`
    margin: 0;
    color: white;
    display: inline-block;

    :not(:first-child) {
        margin: 0 0 0 20px;
        font-weight: 300;
}
`
const Channel = styled.div`
    width: 100%;
    height: calc(100vh - 140px);
    background-image: linear-gradient(to right, #25374D 0%, #30455A 100%);
    background-attachment: fixed;
    box-sizing: border-box;
`