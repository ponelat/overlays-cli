module.exports = function jsonPointerToArray(jsonPointer) {
    return jsonPointer.split('/').slice(1).map(seg => seg.replace(/~1/g, '/').replace(/~0/g, '~'))
}
