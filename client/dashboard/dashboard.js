import Immutable from 'immutable'
import React, { Component, PropTypes } from 'react'
import Charts from '../charts/charts'
import styles from './css/dashboard.css'

export default class Dashboard extends Component {
    render() {
        return (
        <div className={ styles.wrapper }>
            <Charts emotions={ this.props.emotions } />
        </div>
        )
    }
}

Dashboard.propTypes = {
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
}
