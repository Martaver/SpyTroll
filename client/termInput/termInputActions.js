import Immutable from 'immutable'
import request from 'superagent'

export const SEARCH_REQUEST = 'SEARCH_REQUEST'

export function requestSearch() {
    return {
        type: SEARCH_REQUEST,
        payload: {}
    }
}

// export const RECEIVE_COMPANIES = 'RECEIVE_COMPANIES'
//
// export function receiveCompanies(data) {
//     return {
//         type: RECEIVE_COMPANIES,
//         payload: {
//             data
//         }
//     }
// }
//
// export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
//
// export function receiveProducts(data) {
//     return {
//         type: RECEIVE_PRODUCTS,
//         payload: {
//             data
//         }
//     }
// }
//
// export const RECEIVE_TONES = 'RECEIVE_TONES'
//
// export function receiveTones(data) {
//     return {
//         type: RECEIVE_TONES,
//         payload: {
//             data
//         }
//     }
// }

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS'

export function receiveSearch(data) {
    return {
        type: SEARCH_SUCCESS,
        payload: {
            data
        }
    }
}

export const SEARCH_FAILED = 'SEARCH_FAILED'

export function searchRequestFailed(error) {
    return {
        type: SEARCH_FAILED,
        payload: {
            error
        }
    }
}

export function submitSearchTerms() {
    return function(dispatch, getState) {
        dispatch(requestSearch())
        let state = getState()
        let terms =	state.getIn(['form', 'termInput', 'terms', 'value'])

        return request
            .get('/data')
            .query({ searchterm: terms })
            .end(function(err, res){

                if(err) dispatch(searchRequestFailed(err))
                else dispatch(receiveSearch(res))
            })
    }
}
