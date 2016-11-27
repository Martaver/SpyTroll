import React, { Component, PropTypes } from 'react'
import styles from './css/product.css'

export default class Product extends Component {
    render() {
        return (
        <div className={ styles.wrapper }>

        </div>
        )
    }
}

Product.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        companyId: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired
    }).isRequired
}
