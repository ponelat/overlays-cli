const jsonPointerToJsonPath = require('./json-pointer-to-json-path')

describe('jsonPointerToJsonPath', () => {

    it('should map root path', () => {
        expect(jsonPointerToJsonPath('')).toBe('$')
    })

    it('should map for a single segment', () => {
        expect(jsonPointerToJsonPath('/one')).toBe('$["one"]')
    })

    it('should handle jsonPointer escape codes', () => {
        expect(jsonPointerToJsonPath('/paths/~1foo/~0~1home')).toBe('$["paths"]["/foo"]["~/home"]')
    })

})
