import React, { Component, PropTypes } from 'react'
import styles from './css/companyAndProduct.css'

export default class CompanyAndProducts extends Component {
    render() {
        return (
        <div className={ styles.wrapper }>

        </div>
        )
    }
}

CompanyAndProducts.propTypes = {
    companies: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired),
    products: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired)
}
