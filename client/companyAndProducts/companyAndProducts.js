import React, { Component, PropTypes } from 'react'
import styles from './css/companyAndProduct.css'

import Company from './company'
import Product from './product'

export default class CompanyAndProducts extends Component {
    render() {
        return (
        <div className={ styles.wrapper }>
            <Company id={this.props.id} name={this.props.name} />
            {this.props.products.map((product) => {
                return <Dashboard {...product}
                        key={ product.id } />
            })}
        </div>
        )
    }
}

CompanyAndProducts.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        companyId: PropTypes.string.isRequired,
        imageSrc: PropTypes.string.isRequired
    }).isRequired)
}
