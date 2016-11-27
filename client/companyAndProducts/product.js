import React, { Component, PropTypes } from 'react'
import styles from './css/companyAndProducts.css'

export default class Product extends Component {
    render() {
        return (
        <div className={ styles.smallTile } style={{backgroundImage: 'url(' + this.props.imageSrc + ')',}}>
            <div className={ styles.productText }>
                { this.props.name }
            </div>
        </div>
        )
    }
}

Product.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    companyId: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired
}
