import React, { Component, PropTypes } from 'react'
import styles from './css/landing.css'

import Header from '../header/header'
import TermInputContainer from '../termInput/termInputContainer'
import Dashboard from '../dashboard/dashboard'

export default class Landing extends Component {
    render() {
        return (
        <div>
            <Header title='spy/spy' />
            <div className={ styles.wrapper }>
                <TermInputContainer />
                <Dashboard />
            </div>
        </div>
        )
    }
}

Landing.propTypes = {
    companies: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired),
    products: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired),
    tones: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired)
}
