const Ajv = require('ajv')
const ajv = new Ajv({allErrors: true}) // options can be passed, e.g. {allErrors: true}

const overlaysSchema = require('./overlays.schema.json')
const validateOverlays = ajv.compile(overlaysSchema)

// Returns errors or nothing
module.exports = function validate(obj) {
    const valid = validateOverlays(obj)
    if(!valid) {
        return validateOverlays.errors
    }
    return
}
