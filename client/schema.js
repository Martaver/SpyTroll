import { Schema, normalize, arrayOf } from 'normalizr'

export const companySchema = new Schema('companies', {idAttribute: '_id'})
export const productSchema = new Schema('products', {idAttribute: '_id'})

companySchema.define({
    products: arrayOf(productSchema)
})

export const SCHEMAS = {
    companies: companySchema
}

export function checkEntity(entityType) {
    if ( !SCHEMAS.hasOwnProperty(entityType) ) {
        throw new Error(`Unknown entity type (${entityType}) in receiveEntity`)
    }
}

function normalizeEntity(data, entityType) {
    checkEntity(entityType)

    let schema = SCHEMAS[entityType]
    if (!(schema instanceof Schema) && typeof schema === 'object') {
        let schemaType = data[schema.key]
        schema = schema.options[schemaType]
    }
    return normalize(data, schema)
}

export default normalizeEntity
