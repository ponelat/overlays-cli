const set = require('lodash/set')
const get = require('lodash/get')
const unset = require('lodash/unset')
const jsonPath = require('./json-path')
const jsonPointerToArray = require('./json-pointer-to-array')

module.exports = async function applyOverlay(overlay, resolver) {
    let source = overlay.extends ? await resolver(overlay.extends) : {}
    const {actions} = overlay
    actions.forEach(action => {
	jsonPath(source, action.target).forEach(jsonPointer => {

            const path = jsonPointerToArray(jsonPointer)

	    let targetValue = get(source, path)
	    let parentValue = get(source, path.slice(0, -1))

	    if(typeof action.where === 'object' && action.where) {
                const wherePaths = jsonPath(targetValue, action.where.target)

                // Do nothing if this does not yield paths
                if(wherePaths.length < 1) {
                    return
                }

	    }


	    if(action.remove === true) {

		if(Array.isArray(parentValue)) {
		    parentValue.splice(path[path.length - 1], 1)
		    source = setAndReturn(source, path.slice(0, -1), parentValue)
		} else {
		    unset(source, path)
		}
	    } else if(action.update && typeof action.update === 'object') {
		if(Array.isArray(targetValue)) {
		    let merged = [...targetValue, action.update]
		    source = setAndReturn(source, path, merged)
		} else {
		    let merged = Object.assign({}, targetValue, action.update)
		    source = setAndReturn(source, path, merged)
		}
	    } else if(typeof action.update !== 'undefined') {
		source = setAndReturn(source, path, action.update)
	    }
	})
    })
    return source
}

function setAndReturn(src, path, value){
    if(path.length < 1)
        return value
    set(src, path, value)
    return src
}
