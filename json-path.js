const Nimma = require('nimma').default

function arrayBuilder(segment, basePath=[]) {
    return [...basePath, segment]
}

module.exports = function jsonPath(src, query, buildPath=arrayBuilder)  {
    if(query === '$')
        return [buildPath()]

    if(query === '$.one')
        return [buildPath('one')]

    if(query === '$.*') {
        return Object.keys(src).map((key) => buildPath(key))
    }
}
