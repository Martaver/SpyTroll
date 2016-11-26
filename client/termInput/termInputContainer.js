import Immutable from 'immutable'
import { connect } from 'react-redux'

import TermInput from './termInput'
import { changeFieldValue } from '../form/formActions'

const mapStateToProps = (state, ownProps) => {
    let terms = state.getIn(['form', 'termInput'])
        || Immutable.fromJS({
            terms: {
                value: ''
            }
        })

    return terms.toJS()
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        handleChange: (e) => {
            dispatch( changeFieldValue(e.target.name, e.target.value) )
        },
        handleSubmit: (e) => {
            e.preventDefault()
            console.log('scraper goes here')
            // dispatch( scraper goes here )
        }
    }
}

const TermInputContainer = connect(mapStateToProps, mapDispatchToProps)(TermInput)

export default TermInputContainer
