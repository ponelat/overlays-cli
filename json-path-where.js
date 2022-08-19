const get = require('lodash/get')
const jsonPath = require('./json-path')
const jsonPointerToArray = require('./json-pointer-to-array')

module.exports = function jsonPathWhere(input, jsonPaths=['$'], where=[]) {
    jsonPaths = Array.isArray(jsonPaths) ? jsonPaths : [jsonPaths]
    where = Array.isArray(where) ? where : [where]

    let paths = jsonPaths.flatMap(path => {
        return jsonPath(input, path)
    })

    if(!where.length) {
	return paths
    }

    return paths.filter(path => {
        return where.some(w => {
	    let subValue = get(input, jsonPointerToArray(path))
	    let subPaths = jsonPath(subValue, w)
	    return subPaths.length
	})
    })
}
