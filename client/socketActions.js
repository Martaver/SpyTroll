export const RECEIVE_COMPANY = 'RECEIVE_COMPANY'

export function receiveCompany(company) {
    return {
        type: RECEIVE_COMPANY,
        payload: {
            company
        }
    }
}

export const RECEIVE_PRODUCT = 'RECEIVE_PRODUCT'

export function receiveProduct(product) {
    return {
        type: RECEIVE_PRODUCT,
        payload: {
            product
        }
    }
}

export const RECEIVE_COMPANY_TONE = 'RECEIVE_COMPANY_TONE'

export function receiveCompanyTone(tone) {
    return {
        type: RECEIVE_COMPANY_TONE,
        payload: {
            tone
        }
    }
}
