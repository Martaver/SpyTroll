import React, { Component, PropTypes } from 'react'
import styles from './css/termInput.css'

export default class TermInput extends Component {
    render() {
        return (
        <form className={ styles.wrapper }
            name='termInput'
            onSubmit={ this.props.handleSubmit } >
            <input type='text'
                name='termInput.terms'
                placeholder='All about your company...'
                onChange={ this.props.handleChange }
                onBlur={ this.props.handleChange }
                value={ this.props.terms.value } />
            <input type='submit'
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
