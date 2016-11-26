function getNameParts(name) {
    // split the field name into form and field
    let parts = name.split('.')

    if (parts.length !== 2) {
        throw new Error(`Invalid form field name: ${name}. Form field names must have the format <formName>.<fieldName>`)
    }

    return {
        form: parts[0],
        field: parts[1]
    }
}


export const CHANGE_FIELD_VALUE = 'CHANGE_FIELD_VALUE'

export function changeFieldValue(name, newValue) {
    let parts = getNameParts(name)
    return {
        type: CHANGE_FIELD_VALUE,
        payload: {
            form: parts.form,
            field: parts.field,
            value: newValue
        }
    }
}

export const CLEAR_FORM = 'CLEAR_FORM'

export function clearForm(formName) {
    return {
        type: CLEAR_FORM,
        payload: {
            form: formName
        }
    }
}

export const CLEAR_FIELD = 'CLEAR_FIELD'

export function clearField(name) {

    let parts = getNameParts(name)
    return {
        type: CLEAR_FIELD,
        payload: parts
    }
}
