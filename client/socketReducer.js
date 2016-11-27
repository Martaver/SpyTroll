import Immutable from 'immutable'
import update from 'react-addons-update'
import { RECEIVE_COMPANIES, RECEIVE_PRODUCTS, RECEIVE_TONES } from './socketActions'

const initialState = Immutable.Map({
    companies: {}
})

export default function socketReducer(state=initialState, action) {
    let myState = state
    console.log(myState.toJS())
    switch(action.type) {
        case 'RECEIVE_COMPANY':
            console.log('RECEIVE_COMPANY')
            console.log('========================================')
            console.log(action.payload.company)
            console.log(myState)
            myState = update(myState, {
                companies: {$push: action.payload.company}
            })
            console.log(myState.toJS())
            console.log('========================================')
            return myState
        case 'RECEIVE_PRODUCT':
            console.log('RECEIVE_PRODUCT')
            console.log('========================================')
            console.log(action.payload)
            console.log(state.getIn(['entities', 'companies', action.payload.data.companyId, 'products']))
            state.updateIn(['entities', 'companies', action.payload.data.companyId, 'products'], Immutable.fromJS(action.data))
            console.log(state)
            console.log('========================================')
            return state
        case 'RECEIVE_TONE':
            return state.updateIn(['entities', 'companies', action.payload.data.companyId, 'emotions'], Immutable.fromJS(action.payload.data.emotions))
        default:
            return state
    }
}
