import React, { Component } from 'react'
import styled from 'styled-components'
import IconSearch from 'react-icons/lib/md/search'
import { connect } from 'react-redux'
import { selectFriend } from '../Actions'
import { Scrollbars } from 'react-custom-scrollbars'
import IconSettings from 'react-icons/lib/md/settings'
import Plus from 'react-icons/lib/md/add-circle'

class SideBar extends Component {
    render() {
        
        const Background = 'https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg'
        const { firstName, lastName } = this.props

        const ListOfFriends = this.props.friends.map((friend, i) => {
            return(
                <Friend key={ i } onClick={() => this.props.selectFriend(friend.channelID, friend.firstName, friend.lastName, friend.online, friend.photo)}>
                    <FriendsImg style={{ backgroundImage: `url(${friend.photo})` }}>
                        { friend.online ? <OnlineDot /> : null }
                    </FriendsImg>
                    <FriendWrapText>
                        <FriendName>{ friend.firstName } { friend.lastName }</FriendName>
                        <LastMessage>Ciao bella</LastMessage>
                    </FriendWrapText>
                </Friend>
            )
        })

        // console.log(this.props, 'side')
        return(
            <Menu>
            <Me>
                <WrapImg>
                    <ProfileImg style={{ backgroundImage: `url(${Background})` }} />
                </WrapImg>
                <WrapText>
                    <Name>{ firstName } { lastName }</Name>
                    <Description>Junior Javascript</Description>
                </WrapText>
                <StyledIconSettings onClick={this.props.openUserModal} />
            </Me>

            <MenuWrap>
                <Search>
                    <StyledIconSearch />
                    <SearchInput placeholder="Search for People" />
                </Search>

                <FriendsList>
                    <Wrap>
                        <FriendsText>Friends</FriendsText>
                        <StyledIconPlus onClick={this.props.openFriendsModal} />
                    </Wrap>
                    <Scrollbars style={{width: '275px', height: '770px'}} >
                    {
                        ListOfFriends
                    }
                    </Scrollbars>
                </FriendsList>
            </MenuWrap>
        </Menu>
        )
    }
}

const mapStateToProps = state => ({
    u: state.users
})

export default connect(mapStateToProps, { selectFriend })(SideBar)

const Menu = styled.div`
    width: 300px;
    height: 100%;
`
const Me = styled.div`
    width: 100%;
    height: 80px;
    background-color: #3076CC;
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    justify-content: space-between;
`
const WrapImg = styled.div`
    width: 40px;
    display: inline-block;
`
const ProfileImg = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 25px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
`
const WrapText = styled.div`
    margin-right: auto;
`
const Name = styled.p`
    margin: 0 0 0 10px;
    color: white;
`
const Description = styled.p`
    margin: 2px 0 0 10px;
    color: white;
    font-size: 14px;
    font-weight: 300;
`
const StyledIconSettings = styled(IconSettings)`
    font-size: 18px;
    color: white;
    cursor: pointer;
`
const MenuWrap = styled.div`
    background-color: #223754;
    width: 100%;
    height: calc(100vh - 80px);
    padding: 15px;
    box-sizing: border-box;
`
const Search = styled.div`
    border-bottom: 1px solid #bcbcbc;
    padding-bottom: 5px;

`
const StyledIconSearch = styled(IconSearch)`
    color: #bcbcbc;
    font-size: 32px;

`
const SearchInput = styled.input`
    width: 80%;
    border: none;
    background: transparent;
    font-family: 'Montserrat', sans-serif;
    margin: 10px 0 10px 10px;
    &:focus {
        outline: none;
        color: white;
    }
    &::placeholder {
        color: #bcbcbc;
    }
`
const FriendsImg = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    float: left;
    
`
const OnlineDot = styled.div`
    width: 10px;
    height: 10px;
    background-color: lightgreen;
    border-radius: 15px;
    border: 3px solid #223754;
    margin-left: 35px;
`
const FriendsList = styled.div`
    display: flex;
    flex-direction: column;
`
const Wrap = styled.div`
    display: flex;
`
const FriendsText = styled.p`
    color: #DEE4E7;
    font-size: 14px;
    padding: 20px 0 0 0;
    margin: 0;
    width: 50px;
`
const StyledIconPlus = styled(Plus)`
    color: white;
    font-size: 18px;
    display: inline-block;
    margin: 20px 0 0 10px;
    cursor: pointer;
`
const Friend = styled.div`
    display: flex;
    margin: 20px 0 0 0;
    cursor: pointer;
    transition: all 200ms ease-out;

    &:hover {
        background-color: #284266;
    }
`
const FriendWrapText = styled.div`

`
const FriendName = styled.p`
    color: white;
    margin: 4px 0 0 15px;
    font-size: 16px;
`
const LastMessage = styled.p`
    color: white;
    margin: 5px 0 0 15px;
    font-size: 13px;
    font-weight: 300;
`