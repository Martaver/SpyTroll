import Immutable from 'immutable'
import normalizeEntity, { checkEntity } from './schema'

////////////////////////////////////////////////////////////////////////////////
// Synched entity fetching
////////////////////////////////////////////////////////////////////////////////

export const FETCH_ENTITY_REQUEST = 'FETCH_ENTITY_REQUEST'

export function requestEntity(id, entityType) {
    checkEntity(entityType)
    return {
        type: FETCH_ENTITY_REQUEST,
        payload: {
            id,
            entityType
        }
    }
}

export const FETCH_ENTITY_SUCCESS = 'FETCH_ENTITY_SUCCESS'

export function receiveEntity(data, entityType) {
    data = normalizeEntity(data, entityType)
    return {
        type: FETCH_ENTITY_SUCCESS,
        payload: {
            entities: data.entities,
            entityType
        }
    }
}

export const FETCH_ENTITY_FAILED = 'FETCH_ENTITY_FAILED'

export function entityRequestFailed(id, error, entityType) {
    checkEntity(entityType)
    return {
        type: FETCH_ENTITY_FAILED,
        payload: {
            id,
            error,
            entityType
        }
    }
}
