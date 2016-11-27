import Immutable from 'immutable'
import React, { Component, PropTypes } from 'react'
import Charts from '../charts/charts'
import CompanyAndProducts from '../companyAndProducts/companyAndProducts'
import styles from './css/dashboard.css'

export default class Dashboard extends Component {
    render() {
        return (
        <div className={ styles.wrapper }>
            <CompanyAndProducts id={0}
            name='Microsoft'
            products={this.props.products}/>
            <Charts emotions={ this.props.emotions } />
        </div>
        )
    }
}

Dashboard.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    products: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        companyId: PropTypes.number,
        imageSrc: PropTypes.string
    })),
    emotions: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        score: PropTypes.number
    }))
}
