import React, { Component, PropTypes } from 'react'
import styles from './css/landing.css'
import TermInput from '../termInput/termInput'

export default class Landing extends Component {
    render() {
        return (
        <div className={ styles.wrapper }>
            <div className={ styles.normal }>
                <TermInput
                    handleSubmit={ this.props.handleSubmit }
                    handleChange={ this.props.handleChange } />
            </div>
        </div>
        )
    }
}

Landing.propTypes = {
    companies: PropTypes.objectOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired),
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired
}
