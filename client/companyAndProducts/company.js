import React, { Component, PropTypes } from 'react'
import styles from './css/companyAndProducts.css'

export default class Company extends Component {
    render() {
        return (
            <div className={ styles.bigTile }>
                <div className={ styles.companyText }>
                    { this.props.name }
                </div>
            </div>
        )
    }
}

Company.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
}
