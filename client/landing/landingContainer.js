import Immutable from 'immutable'
import { connect } from 'react-redux'
import Landing from './landing'
import { changeFieldValue } from '../form/formActions'

const mapStateToProps = (state) => {
    return {
        companies: state.getIn(['entities']).companies
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

const LandingContainer = connect(mapStateToProps, mapDispatchToProps)(Landing)

export default LandingContainer
