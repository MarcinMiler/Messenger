import { createStore, applyMiddleware, combineReducers } from 'redux'
import { ApolloClient, createNetworkInterface } from 'react-apollo'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws'
// import rootReducer from './Reducers/rootReducer'
import userReducer from './Reducers/userReducer'

const networkInterface = createNetworkInterface({ uri: 'http://localhost:4000/graphql' })
const wsClient = new SubscriptionClient(`ws://localhost:4000/subscriptions`, {
    reconnect: true,
})

// const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
//   networkInterface,
//   wsClient
// );
networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }

      req.options.headers['x-token'] = localStorage.getItem('token');
      next();
    },
  },
]);

export const client = new ApolloClient({
    networkInterface: networkInterface,
})

const middlewares = [client.middleware(), thunk]

export const store = createStore(
    combineReducers({
      users: userReducer,
      apollo: client.reducer(),
    }),
    {},
    composeWithDevTools(applyMiddleware(...middlewares))
)
