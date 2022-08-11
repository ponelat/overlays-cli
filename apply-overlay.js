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
		    if(action.remove === true) {
			unset(source, path)
		    } else if(action.update && typeof action.update === 'object') {
			let merged = Object.assign({}, get(source, path), action.update)
			source = setAndReturn(source, path, merged)
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
