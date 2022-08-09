const Nimma = require('nimma').default

const unset = require('lodash/unset')

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
		if(action.remove) {
		    unset(source, path)
		}
	    },
	});

    })
    return source
}
