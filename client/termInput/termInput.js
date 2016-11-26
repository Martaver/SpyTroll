import React, { Component, PropTypes } from 'react'
import styles from './css/termInput.css'

export default class TermInput extends Component {
    render() {
        return (
        <form className={ styles.wrapper }>
            <input type='text'
                onChange={ this.props.handleChange }
                onBlur={ this.props.handleChange }
                value={ this.props.terms.value } />
            <input type='submit'
                onSubmit={ this.props.handleSubmit }
                value='Submit' />
        </form>
        )
    }
}

TermInput.propTypes = {
    handleChange: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    terms: PropTypes.shape({
        value: PropTypes.string.isRequired
    })
}
