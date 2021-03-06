import Immutable from 'immutable'
import { FETCH_ENTITY_REQUEST, FETCH_ENTITY_SUCCESS, FETCH_ENTITY_FAILED } from './async'
// import { RECEIVE_COMPANIES, RECEIVE_PRODUCTS, RECEIVE_TONES } from './termInput/termInputActions'

const initial = Immutable.fromJS({
    companies: []
})

function saveEntity(state, group, data)  {
    return state = state.update(group, Immutable.Map(), (items) => {
        return items.set( data.get('_id'), data )
    })
}

function recordRequestedEntity(state, payload) {
    let entity = state.getIn([payload.entityType, payload.id])

    if (entity) {
        return state.setIn([payload.entityType, payload.id, 'isLoading'], true)
            .removeIn([payload.entityType, payload.id, 'error'])
    } else {
        let entities = {
            [payload.entityType] : {
                [payload.id] : {
                    _id: payload.id
                }
            }
        }
        return mergeEntities(state, entities, true)
    }
}

function recordFetchFailed(state, payload) {
    let entities = {
        [payload.entityType] : {
            [payload.id] : {
                _id: payload.id
            }
        }
    }

    return mergeEntities(state, entities, false, payload.error)
}

function handleLoading(entities, isLoading, error) {
    if (!isLoading) {
        isLoading = false
    }
    for (let key of Object.keys(entities)) {
        let entity = entities[key]

        if (isLoading) {
            delete entity.error
        } else if (error) {
            entity.error = error
        }
        entity.isLoading = isLoading
    }

    return entities
}

export function mergeEntities(state, entities, isLoading, error) {
    if (typeof entities.terms === 'object') {
        state = state.mergeIn(['terms'], entities.terms)
    }

    return state
}

export default function entityReducer(state=initial, action) {
    switch(action.type) {
        case 'RECEIVE_COMPANIES':
            console.log('========================================')
            console.log(action.data)
            console.log(state.getIn(['entities', 'companies']))
            state.mergeIn(['entities', 'companies'], action.data)
            console.log(state)
            console.log('========================================')
            return state
        case 'RECEIVE_PRODUCTS':
            console.log('========================================')
            console.log(action.data)
            console.log(state.getIn(['entities', 'companies', action.data.companyId, 'products']))
            state.mergeIn(['entities', 'companies', action.data.companyId, 'products'], Immutable.fromJS(action.data))
            console.log(state)
            console.log('========================================')
            return state
        case 'RECEIVE_TONES':
            return state.mergeIn(['entities', 'companies', action.data.companyId, 'emotions'], Immutable.fromJS(action.data.emotions))
        default:
            return state
    }
}
