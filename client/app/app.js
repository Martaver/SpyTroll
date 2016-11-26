import React, { Component, PropTypes } from 'react'
import Notifications from 'react-notify-toast'
import styles from './css/app.css'

/*
 * Adds in the notifications system
 */

class App extends Component {
    render() {
        return (
            <div className={ styles.wrapper }>
                <Notifications />
                { this.props.children }
            </div>
        )
    }
}

App.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element
    ])
}

export default App
