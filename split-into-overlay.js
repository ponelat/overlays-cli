const jsonPathWhere = require('./json-path-where')
const jsonPointerToArray = require('./json-pointer-to-array')
const jsonPointerToJsonPath = require('./json-pointer-to-json-path')
const get = require('./get')

module.exports = function splitIntoOverlay(input, {targets=[], fields=[], where=[]} = {}) {
    let overlay = {overlays: '1.0.0'}
    targets = Array.isArray(targets) ? targets : [targets]
    where = Array.isArray(where) ? where : [where]
    if(!targets.length)
        return overlay

    let paths = jsonPathWhere(input, targets, where)

    let actions = paths.map(path => {
        let update  
        if(!fields.length) {
	    update = get(input, jsonPointerToArray(path))
        } else {
            update = fields.reduce((acc, field) => {
                acc[field] = get(input, [...jsonPointerToArray(path), field])
                return acc
            }, {})
        }
        return {
            target: jsonPointerToJsonPath(path),
            update,
        }
    })

    return {...overlay, actions}
}
