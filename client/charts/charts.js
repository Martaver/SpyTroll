import React, { Component, PropTypes } from 'react'
import { PieChart } from 'rd3'
import styles from './css/charts.css'

export default class Charts extends Component {
    render() {
        let chart2, chart3

        if (this.props.term2) {
            let term2JS = this.props.term2.toJS()
            chart2 = (<PieChart
                data={[{label: this.props.term2.get('name'), value: +(this.props.term2.get('value')*100).toFixed(1)}, {label: '', value: +(100-this.props.term2.get('value')*100).toFixed(1)}]}
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

        if (this.props.term3) {
            let term3JS = this.props.term3.toJS()
            chart3 = (<PieChart
                data={[{label: this.props.term3.get('name'), value: +(this.props.term3.get('value')*100).toFixed(1)}, {label: '', value: +(100-this.props.term3.get('value')*100).toFixed(1)}]}
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
                data={[{label: this.props.term1.get('name'), value: +(this.props.term1.get('value')*100).toFixed(1)}, {label: '', value: +(100-this.props.term1.get('value')*100).toFixed(1)}]}
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
                sectorBorderColor={'#F3F3F3'} />
            { chart2 }
            { chart3 }
        </div>
        )
    }
}

Charts.propTypes = {
    term1: PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number
    }).isRequired,
    term2: PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number
    }),
    term3: PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.number
    })
}
