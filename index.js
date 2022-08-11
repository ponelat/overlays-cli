const Nimma = require('nimma').default

const unset = require('lodash/unset')
const set = require('lodash/set')
const get = require('lodash/get')

module.exports = {
    applyOverlay
}

async function applyOverlay(overlay, resolver) {
    const source = await resolver(overlay.extends)
    const {actions} = overlay
    actions.forEach(action => {
	const n = new Nimma([action.target]);
	n.query(source, {
	    [action.target]({ path }) {
		if(action.remove === true) {
		    unset(source, path)
		} else if(action.update && typeof action.update === 'object') {
                    let merged = Object.assign({}, get(source, path), action.update)
		    set(source, path, merged)
		} else if(typeof action.update !== 'undefined') {
		    set(source, path, action.update)
		}
	    },
	});

    })
    return source
}
