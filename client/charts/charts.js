import React, { Component, PropTypes } from 'react'
import { PieChart } from 'rd3'
import styles from './css/charts.css'

export default class Charts extends Component {
    render() {
        let chart2, chart3
        console.log(this.props.emotions)
        console.log(this.props.emotions[0])

        if (this.props.emotions[1]) {
            let tone2JS = this.props.emotions[1].toJS()
            chart2 = (<PieChart
                data={[{label: this.props.emotions[1].get('name'), value: +(this.props.emotions[1].get('score')*100).toFixed(1)}, {label: '', value: +(100-this.props.emotions[1].get('score')*100).toFixed(1)}]}
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

        if (this.props.emotions[2]) {
            let tone3JS = this.props.emotions[2].toJS()
            chart3 = (<PieChart
                data={[{label: this.props.emotions[2].get('name'), value: +(this.props.emotions[2].get('score')*100).toFixed(1)}, {label: '', value: +(100-this.props.emotions[2].get('score')*100).toFixed(1)}]}
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
                data={[{label: this.props.emotions[0].get('name'), value: +(this.props.emotions[0].get('score')*100).toFixed(1)}, {label: '', value: +(100-this.props.emotions[0].get('score')*100).toFixed(1)}]}
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
    emotions: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        score: PropTypes.number
    }).isRequired).isRequired
}
