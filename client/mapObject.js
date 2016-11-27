export default function mapObject(object, callback) {
    return Object.keys(object).map(
        key => callback(key, object[key])
    )
}
