import Immutable from 'immutable'
import entityReducer from './entityReducer'
import formReducer from './form/formReducer'
import routerReducer from './routerReducer'

const initialState = Immutable.Map()
function reduce(state=initialState,  action) {
    return Immutable.Map({
        entities: entityReducer(state.get('entities'), action),
        form: formReducer(state.get('form'), action),
        routing: routerReducer(state.get('routing'), action)
    })
}

export default reduce
