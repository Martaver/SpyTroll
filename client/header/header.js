import React, { Component, PropTypes } from 'react'
import styles from './css/header.css'

export default class Header extends Component {
    render() {
        return (
            <h1 className={ styles.header } >
                { this.props.title }
            </h1>
        )
    }
}

Header.propTypes = {
    title: PropTypes.string.isRequired
}
