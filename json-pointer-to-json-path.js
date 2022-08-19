const jsonPointerToArray = require('./json-pointer-to-array.js')
module.exports = function jsonPointerToJsonPath(jsonPointer) {
    return '$' + jsonPointerToArray(jsonPointer).map(item => `["${item}"]`).join('')
}
