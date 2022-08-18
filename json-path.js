// const Nimma = require('nimma').default
const {JSONPath} = require('jsonpath-plus');

function arrayBuilder(segment, basePath=[]) {
    return [...basePath, segment]
}

// JSONPath => JSONPointer[]
module.exports = function jsonPath(src, query)  {
    return JSONPath({path: query, json: src, resultType: 'pointer'});
}

module.exports.jsonPointerToArray = function jsonPointerToArray(jsonPointer) {
    let path = jsonPointer.split('/').map(seg => seg.replace(/~1/g, '/').replace(/~0/g, '~'))
    if(path[0] === '#')
        return path.slice(1)
    return path
}
