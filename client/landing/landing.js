import React, { Component, PropTypes } from 'react'
import styles from './css/landing.css'

import Header from '../header/header'
import TermInputContainer from '../termInput/termInputContainer'

export default class Landing extends Component {
    render() {
        return (
        <div className={ styles.wrapper }>
            <Header title='spy/spy' />
            <TermInputContainer />
        </div>
        )
    }
}

Landing.propTypes = {
    companies: PropTypes.objectOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired)
}
