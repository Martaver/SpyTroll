import React, { Component, PropTypes } from 'react'
import { PieChart } from 'rd3'
import styles from './css/charts.css'

export default class Charts extends Component {
    render() {
        let chart2, chart3
        if (this.props.emotions) {
            let tone2JS = this.props.emotions[1]
            chart2 = (<PieChart
                data={[{label: 'Joy', value: +(0.5*100).toFixed(1)}, {label: '', value: +(100-0.5*100).toFixed(1)}]}
                width={450}
                height={400}
                radius={110}
                innerRadius={80}
                valueTextFill={'#F3F3F3'}
                colors={(n) => {
                    let colors = ['#dc3912', '#F3F3F3']
                    return colors[n % colors.length]
                }}
                showOuterLabels={false}
                sectorBorderColor={'#F3F3F3'} />)
        }

        if (this.props.emotions) {
            let tone3JS = this.props.emotions[2]
            chart3 = (<PieChart
                data={[{label: 'Anger', value: +(0.15*100).toFixed(1)}, {label: '', value: +(100-0.15*100).toFixed(1)}]}
                width={450}
                height={400}
                radius={110}
                innerRadius={80}
                valueTextFill={'#F3F3F3'}
                colors={(n) => {
                    let colors = ['#dc3912', '#F3F3F3']
                    return colors[n % colors.length]
                }}
                showOuterLabels={false}
                sectorBorderColor={'#F3F3F3'} />)
        }

        return (
        <div className={ styles.wrapper }>
            <PieChart
                data={[{label: 'Joy', value: +(0.55*100).toFixed(1)}, {label: '', value: +(100-0.55*100).toFixed(1)}]}
                width={450}
                height={400}
                radius={110}
                innerRadius={50}
                valueTextFill={'#F3F3F3'}
                colors={(n) => {
                    let colors = ['#dc3912', '#F3F3F3']
                    return colors[n % colors.length]
                }}
                showOuterLabels={false}
                sectorBorderColor={'#F3F3F3'} />

        </div>
        )
    }
}

Charts.propTypes = {
    emotions: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        score: PropTypes.number
    }).isRequired)
}
