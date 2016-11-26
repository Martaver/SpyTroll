import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'

import reducers from './reducers'
import AppContainer from './app/appContainer'
import LandingContainer from './landing/landingContainer'

////////////////////////////////////////////////////////////////////////////////
// Redux Store initialization
////////////////////////////////////////////////////////////////////////////////

let store = createStore(reducers)

////////////////////////////////////////////////////////////////////////////////
// Render the DOM
////////////////////////////////////////////////////////////////////////////////

let rootElement = document.getElementById('app')

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <Route path="/" components={ AppContainer }>
                <IndexRoute component={ LandingContainer } />
            </Route>
        </Router>
    </Provider>,
    rootElement
)
