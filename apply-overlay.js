const Nimma = require('nimma').default
const set = require('lodash/set')
const get = require('lodash/get')
const unset = require('lodash/unset')

module.exports = async function applyOverlay(overlay, resolver) {
    let source = overlay.extends ? await resolver(overlay.extends) : {}
    const {actions} = overlay
    actions.forEach(action => {
	const n = new Nimma([action.target]);
        // TODO: Nimma catches the error in .query and it's not easy to report
        let error
	n.query(source, {
	    [action.target]({ path }) {
		try {

                    if(typeof action.when !== 'undefined') {
                        if(path.includes('post'))
                            return 
                    }


                    let targetValue = get(source, path)
                    let parentValue = get(source, path.slice(0, -1))

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
		} catch(e) {
		    error = e
		}
	    },
	});
	if(error) {
	    throw error
	}
    })
    return source
}

function setAndReturn(src, path, value){
    if(path.length < 1)
        return value
    set(src, path, value)
    return src
}
