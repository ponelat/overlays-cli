const set = require('./set')
const get = require('./get')
const remove = require('./remove')
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
                let whereClausSucceeded = true

                if(typeof action.where.target === 'string') {
		    const wherePaths = jsonPath(targetValue, action.where.target)
                    whereClausSucceeded = wherePaths && wherePaths.length > 0
                }
		    
                if(typeof action.where.empty === 'boolean') {
                    // null | {} | [] | ''
                    const isNull = targetValue === null
                    const isEmptyStr = targetValue === ''
                    const isEmptyObject = typeof targetValue === 'object' && targetValue && !Object.keys(targetValue).length
                    const isEmptyArray = Array.isArray(targetValue) && !targetValue.length
                    const isEmpty = (isNull || isEmptyStr || isEmptyObject || isEmptyArray)

                    whereClausSucceeded = action.where.empty == isEmpty
                }

                if(action.where.not === true) {
                    whereClausSucceeded = !whereClausSucceeded
                }

                // If the where clause failed, bail.
                if(!whereClausSucceeded) {
		    return
                }
	    }

	    if(action.remove === true) {
                source = remove(source, path)
	    } else if(action.update && typeof action.update === 'object') {
		if(Array.isArray(targetValue)) {
		    let merged = [...targetValue, action.update]
		    source = set(source, path, merged)
		} else {
		    let merged = Object.assign({}, targetValue, action.update)
		    source = set(source, path, merged)
		}
	    } else if(typeof action.update !== 'undefined') {
		source = set(source, path, action.update)
	    }
	})
    })
    return source
}
