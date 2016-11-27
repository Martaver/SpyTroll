import React, { Component, PropTypes } from 'react'
import styles from './css/companyAndProducts.css'

import Company from './company'
import Product from './product'

export default class CompanyAndProducts extends Component {
    // {this.props.products.map((product) => {
    //     return <Product {...product}
    //             key={ product.id } />
    // })}
    render() {
        return (
        <div className={ styles.wrapper }>
            <Company id={this.props.id} name={this.props.name} />

        </div>
        )
    }
}

CompanyAndProducts.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        companyId: PropTypes.number.isRequired,
        imageSrc: PropTypes.string.isRequired
    }).isRequired)
}
