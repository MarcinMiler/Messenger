import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { setContext } from 'apollo-link-context'

import AppContainer from './Containers/AppContainer'
import Login from './Components/Login'
import AddFriend from './Components/AddFriend'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './Reducers/rootReducer'

const store = createStore(
    rootReducer, applyMiddleware(thunk)
)

const httpLink = new HttpLink({ uri: 'https://marcinmiler.herokuapp.com/graphql' })

const middlewareLink = setContext(() => ({
    headers: {
      'x-token': localStorage.getItem('token')
    },
}))

const wsLink = new WebSocketLink({
  uri: `wss://marcinmiler.herokuapp.com/subscriptions`,
  options: {
    reconnect: true
  }
})

const linkConcat = middlewareLink.concat(httpLink)

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query)
    return kind === 'OperationDefinition' && operation === 'subscription'
  }, 
  wsLink,
  linkConcat,
)

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <Router>
                <div>
                    <Route exact path="/" component={Login}/>
                    <Route exact path="/app" component={AppContainer}/>
                    <Route exact path="/addFriend" component={AddFriend}/>
                </div>
            </Router>
        </Provider>
    </ApolloProvider>,
    document.getElementById('root')
)
registerServiceWorker()
