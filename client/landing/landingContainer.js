import Immutable from 'immutable'
import { connect } from 'react-redux'
import Landing from './landing'
import { changeFieldValue } from '../form/formActions'

const mapStateToProps = (state) => {
    let termsForm = state.getIn(['form', 'terms'])
    let terms = state.get('terms')
    return {
        companies: state.get('entities').get('companies').toJS(),
        terms: termsForm ? termsForm.get('terms').toJS(): { value: '' }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleChange: (e) => {
            dispatch(changeFieldValue(e.target.name, e.target.value))
        },
        handleSubmit: (e) => {
            e.preventDefault()
            // dispatch(createNewSearch())
            return false
        }
    }
}

const LandingContainer = connect(mapStateToProps, mapDispatchToProps)(Landing)

export default LandingContainer
