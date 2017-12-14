import React, { Component } from 'react'
import styled from 'styled-components'

import SideBarContainer from '../Containers/SideBarContainer'
import MessagesContainer from '../Containers/MessagesContainer'

class App extends Component {

    render() {
        const { me } = this.props
        return(
            <Container>
                
                <SideBarContainer me={me} />
                <MessagesContainer me={me} />

            </Container>
        )
    }
}

export default App

const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`