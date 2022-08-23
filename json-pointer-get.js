const jsonPointerToArray = require('./json-pointer-to-array')
const get = require('./get')

module.exports = function jsonPointerGet(input, pointer) {
    return get(input, jsonPointerToArray(pointer))
}
