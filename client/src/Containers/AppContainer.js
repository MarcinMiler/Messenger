import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'
import App from '../Components/App'

class AppContainer extends Component {

    componentDidMount() {
        window.onbeforeunload = () => this.online(false)
        this.online(true)
    }
    online = async status => await this.props.isOnline({ variables: { online: status } })

    render() {

        if(this.props.me.loading) return ""
        const { me } = this.props.me
        
        return(
            <div>
                { me && <App me={me} />}
            </div>
        )
    }
}
const meQuery = gql`
    query me {
        me {
            id,
            firstName,
            lastName,
            email,
            photo,
        }
    }
`
const isOnlineMutation = gql`
    mutation isOnline($online: Boolean!) {
        isOnline(online: $online)
    }
`
export default compose(
    graphql(meQuery, { name: 'me'}),
    graphql(isOnlineMutation, { name: 'isOnline'}),
)(AppContainer)