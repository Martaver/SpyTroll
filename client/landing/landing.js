import React, { Component, PropTypes } from 'react'
import styles from './css/landing.css'

import Header from '../header/header'
import TermInputContainer from '../termInput/termInputContainer'
import Dashboard from '../dashboard/dashboard'

export default class Landing extends Component {
    render() {
        return (
        <div>
            <Header title='spy/spy' />
            <div className={ styles.wrapper }>
                <TermInputContainer />
                {this.props.companies.map((company) => {
                    return <Dashboard {...company}
                            key={ company.id } />
                })}
            </div>
        </div>
        )
    }
}

Landing.propTypes = {
    companies: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        products: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            companyId: PropTypes.string.isRequired,
            imageSrc: PropTypes.string.isRequired
        }).isRequired),
        emotions: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string,
            score: PropTypes.number
        }).isRequired).isRequired
    }).isRequired)
}
