import React, { Component } from 'react'
import styled from 'styled-components'
import { Scrollbars } from 'react-custom-scrollbars'

import BottomNav from './BottomNav'

const Messages = ({
    me,
    friend,
    messages
}) => (
    <Some>
        <Header>
            <HeaderP>{ friend.firstName } { friend.lastName }</HeaderP>
            <HeaderP>{ friend.online ? <span>online</span> : <span>offline</span> }</HeaderP>
        </Header>

        <Channel>
        <Scrollbars style={{ width: '100%', height: '100%' }}>
            {
                messages.map(msg => (
                    <WrapMessage key={ msg.id }>
                        {
                            msg.author === me.id
                            ?   
                                <WrapMessageImg>
                                    <MessageImg style={{ backgroundImage: `url(${me.photo})` }} />
                                    <Message>
                                        <MessageText>{ msg.text }</MessageText>
                                    </Message>
                                </WrapMessageImg>
                            :   
                                <WrapMessageImgInvert>
                                    <Message>
                                        <MessageText>{ msg.text }</MessageText>
                                    </Message>
                                    <MessageImg style={{ backgroundImage: `url(${friend.photo})` }} />
                                </WrapMessageImgInvert>
                        }
                    </WrapMessage>
                ))
            }
        </Scrollbars>
            
        </Channel>

        <BottomNav me={me} />

    </Some>
)

export default Messages

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
const WrapMessage = styled.div`
    margin: 15px 0 15px 0;
`
const Time = styled.p`
    text-align: center;
    color: white;
    font-size: 13px;
    margin: 15px 0 15px 0;
`
const WrapMessageImg = styled.div`
    display: flex;
`
const WrapMessageImgInvert = styled(WrapMessageImg)`
    justify-content: flex-end;
`
const MessageImg = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 0 10px 0 10px;
    background- color: black;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
`
const Message = styled.div`
    position: relative;
    max-width: 40%;
    box-sizing: border-box;
    padding: 15px;
    background-color: #1C2B3D;
    border-radius: 8px;

`
const MessageText = styled.p`
    color: white;
    margin: 0;
    font-size: 13px;
    font-weight: 300;
`