import Immutable from 'immutable'
import React, { Component, PropTypes } from 'react'
import Charts from '../charts/charts'
import styles from './css/dashboard.css'

export default class Dashboard extends Component {
    render() {
        return (
        <div className={ styles.wrapper }>
            <Charts
                term1={Immutable.fromJS({name: 'Joy', value: 0.923})}
                term2={Immutable.fromJS({name: 'Sadness', value: 0.923})}
                term3={Immutable.fromJS({name: 'Anger', value: 0.923})} />
        </div>
        )
    }
}

Dashboard.propTypes = {}
