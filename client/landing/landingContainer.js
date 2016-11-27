import Immutable from 'immutable'
import { connect } from 'react-redux'
import Landing from './landing'
import { changeFieldValue } from '../form/formActions'

const mapStateToProps = (state) => {
    return {
        companies: state.get('entities').get('companies').toJS()
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

const LandingContainer = connect(mapStateToProps, mapDispatchToProps)(Landing)

export default LandingContainer
