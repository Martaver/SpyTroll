import React, { Component, PropTypes } from 'react'
import styles from './css/landing.css'

import Header from '../header/header'
import TermInputContainer from '../termInput/termInputContainer'
import Dashboard from '../dashboard/dashboard'
// import mapObject from '../mapObject'

export default class Landing extends Component {
    render() {
        let dashboards = this.props.companies ? (this.props.companies.map((company) => {
            console.log(...company)
            return <Dashboard {...this.props.companies[0]}
                    key={ company.id } />
        })) : null
        return (
        <div>
            <Header title='spy/spy' />
            <div className={ styles.wrapper }>
                <TermInputContainer />
                <Dashboard {...this.props.companies[2]} />
            </div>
        </div>
        )
    }
}

Landing.propTypes = {
    companies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        products: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            companyId: PropTypes.number.isRequired,
            imageSrc: PropTypes.string.isRequired
        }).isRequired),
        emotions: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            score: PropTypes.number
        }).isRequired).isRequired
    }).isRequired)
}
