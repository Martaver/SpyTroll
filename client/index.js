import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware } from 'redux'
import createSocketIoMiddleware from 'redux-socket.io'
import thunk from 'redux-thunk'
import io from 'socket.io-client'
import startSocket from './socket'

import reducers from './reducers'
import AppContainer from './app/appContainer'
import LandingContainer from './landing/landingContainer'

////////////////////////////////////////////////////////////////////////////////
// Redux Store initialization
////////////////////////////////////////////////////////////////////////////////

let socket = startSocket()
let socketIoMiddleware = createSocketIoMiddleware(socket, { execute: function(action, emit, next, dispatch) {
    emit('action', action)
    dispatch( console.log('INDEXJS ACTION HERE') )
    dispatch( console.log(action) )
    next(action)
} })

let store = applyMiddleware(thunk,
                            socketIoMiddleware,
                            routerMiddleware(browserHistory))(createStore)(reducers)

store.subscribe(()=>{
    // console.log('new client state', store.getState())
})
store.dispatch({type:'test', data:'testing'})

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
