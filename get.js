const lodashGet = require('lodash/get')

module.exports = function get(input, path) {
    if(!Array.isArray(path)) {
        throw new Error('Path must be an array')
    }

    if(!path.length)
        return input

    return lodashGet(input, path)
}
