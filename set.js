const lodashSet = require('lodash/set')

module.exports = function get(input, path, value) {
    if(!Array.isArray(path)) {
        throw new Error('Path must be an array')
    }


    if(!path.length)
        return value

    lodashSet(input, path, value)
    return input
}
