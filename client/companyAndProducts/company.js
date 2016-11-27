import React, { Component, PropTypes } from 'react'
import styles from './css/company.css'

export default class Company extends Component {
    render() {
        return (
            <div className={ styles.wrapper }>

            </div>
        )
    }
}

Company.propTypes = {
    company: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired
}
