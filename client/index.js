import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'
import AppContainer from './app/appContainer'
import LandingContainer from './landing/landingContainer'

import io from 'socket.io-client'

var client = io()

console.log('io: ', client);

////////////////////////////////////////////////////////////////////////////////
// Redux Store initialization
////////////////////////////////////////////////////////////////////////////////

let store = createStore(reducers,
                applyMiddleware(thunk,
                routerMiddleware(browserHistory)))

////////////////////////////////////////////////////////////////////////////////
// Render the DOM
////////////////////////////////////////////////////////////////////////////////

let rootElement = document.getElementById('app')

const syncedHistory = syncHistoryWithStore(browserHistory, store, {
    selectLocationState: (state) => state.get('routing').toJS()
})

ReactDOM.render(
    <Provider store={ store }>
        <Router history={ syncedHistory }>
            <Route path="/" components={ AppContainer }>
                <IndexRoute component={ LandingContainer } />
            </Route>
        </Router>
    </Provider>,
    rootElement
)
