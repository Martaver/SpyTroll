import Immutable from 'immutable'
import * as actions from './formActions'

const initialState = Immutable.Map()

export default function formReducer(state=initialState, action) {
    switch ( action.type ) {
        case actions.CHANGE_FIELD_VALUE:
            return state.setIn([action.payload.form, action.payload.field, 'value'],
                                action.payload.value)
        case actions.CLEAR_FORM:
            return state.delete(action.payload.form)
        case actions.CLEAR_FIELD:
            return state.deleteIn([action.payload.form, action.payload.field])
        default:
            return state
    }
}
