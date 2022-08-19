const jsonPath = require('./json-path')
const jsonPointerToArray = require('./json-pointer-to-array')
const jsonPointerToJsonPath = require('./json-pointer-to-json-path')
const get = require('lodash/get')

module.exports = function splitIntoOverlay(input, {targets=[], fields=[], where} = {}) {
    let overlay = {overlays: '1.0.0'}
    targets = Array.isArray(targets) ? targets : [targets]
    if(!targets.length)
        return overlay

    let paths = targets.flatMap(query => jsonPath(input, query))
    if(typeof where === 'string') {
	paths = paths.filter(path => {
            const subValue = get(input, jsonPointerToArray(path))
            const subPaths = jsonPath(subValue, where)
            return subPaths.length
	})
    }

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
