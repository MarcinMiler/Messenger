import React, { Component } from 'react'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
// import moment from 'moment'
import SendIcon from 'react-icons/lib/md/send'

class BottomNav extends Component {
    render() {

        const Send = e => {

            if(e.keyCode === 13) {
                this.props.addMessage({
                    variables: {
                        channelID: this.props.id,
                        text: e.target.value,
                        author: this.props.me.id
                    }
                })
                e.target.value = ''
            }
        }
        
        return(
            <Nav>
                <Input placeholder="Say something..." onKeyUp={ Send } />
                <Button><StyledSendIcon /></Button>
            </Nav>
        )
    }
}
const addMessageMutation = gql`
    mutation addMessage($channelID: ID! $text: String! $author: ID!) {
        addMessage(channelID: $channelID text: $text author: $author) {
            id,
            text,
            author
        }
    }
`
const mapStateToProps = state => ({
    id: state.users.channelID
})

const BottomNavWithData = graphql(addMessageMutation, {
    name: 'addMessage'
})(BottomNav)

const BottomNavWithDataAndState = connect(mapStateToProps, null)(BottomNavWithData)

export default BottomNavWithDataAndState

const Nav = styled.div`
    width: 100%;
    height: 60px;
    background-color: #1C2B3D;
    display: flex;
`
const Input = styled.input`
    width: 100%;
    background: transparent;
    border: none;
    color: white;
    font-size: 16px;
    font-family: 'Montserrat', sans-serif;
    margin: 20px;

    &:focus {
        outline: none;
    }
`
const Button = styled.div`
    width: 70px;
    background-color: #3076CC;
    text-align: center;
`
const StyledSendIcon = styled(SendIcon)`
    font-size: 34px;
    color: white;
    margin: 13px 0 0 0;
`

