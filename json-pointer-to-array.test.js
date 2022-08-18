const jsonPointerToArray = require('./json-pointer-to-array.js')

describe('jsonPointerToArray', () => {

    it('should handle root', () => {
        expect(jsonPointerToArray('')).toEqual([])
        expect(jsonPointerToArray('#')).toEqual([])
    })

    it('should handle /one/two', () => {
        expect(jsonPointerToArray('/one/two')).toEqual(['one', 'two'])
    })

    it('should handle ~ characters', () => {
        expect(jsonPointerToArray('/~0home')).toEqual(['~home'])
    })

    it('should handle / characters', () => {
        expect(jsonPointerToArray('/~1home')).toEqual(['/home'])
    })

    it('should handle both / and ~ characters', () => {
        expect(jsonPointerToArray('/~1home/~0josh')).toEqual(['/home', '~josh'])
    })

})
