const applyOverlay = require('./apply-overlay')
const externalResolver = require('./external-resolver.js')

// Validation
const validateOverlays = require('./validate-overlays.js')

module.exports = async function overlay(overlayObj, resolver=externalResolver) {
    const errors = validateOverlays(overlayObj)
    if(errors) {
	throw errors
    }
    return await applyOverlay(overlayObj, resolver)
}
module.exports.applyOverlay = require('./apply-overlay.js')
module.exports.validateOverlays = require('./validate-overlays.js')
module.exports.splitIntoOverlay = require('./split-into-overlay.js')

module.exports.get = require('./get.js')
module.exports.remove = require('./remove.js')
module.exports.set = require('./set.js')

module.exports.jsonPath = require('./json-path')
module.exports.jsonPathWhere = require('./json-path-where')
module.exports.jsonPointerGet = require('./json-pointer-get.js')
module.exports.jsonPointerToArray = require('./json-pointer-to-array.js')
module.exports.jsonPointerToJsonPath = require('./json-pointer-to-json-path.js')
