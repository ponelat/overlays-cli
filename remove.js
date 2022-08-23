const unset = require('lodash/unset')
const get = require('./get')

module.exports = function remove(input, path) {
    if(!Array.isArray(path)) {
        throw new Error('Path must be an array')
    }

    if(!path.length)
        return null

    const target = get(input,path)
    const parentValue = get(input, path.slice(0, -1))

    if(Array.isArray(parentValue)) {
	const index = path[path.length - 1]
        if(typeof parentValue[index] !== 'undefined') {
	    parentValue.splice(index, 1)
        }
    } else {
	unset(input, path)
    }
    return input
}
