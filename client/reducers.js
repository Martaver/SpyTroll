import Immutable from 'immutable'
import entityReducer from './entityReducer'
import formReducer from './form/formReducer'

const initialState = Immutable.Map()
function reduce(state=initialState,  action) {
    return Immutable.Map({
        entities: entityReducer(state.get('entities'), action),
        form: formReducer(state.get('form'), action)
    })
}

export default reduce
