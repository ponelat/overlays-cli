const jsonPointerGet = require('./json-pointer-get')

describe('jsonPointerGet', () => {

    it('should get the value in document pointed to', () => {
	// Given
        const input = {
            one: 1
        }
        expect(jsonPointerGet(input, '/one')).toBe(1)
    })

    it('should handle nested values', () => {
	// Given
        const input = {
            one: {
                two: {
                    three: 4
                }
                
            }
        }
        expect(jsonPointerGet(input, '/one/two/three')).toBe(4)
    })

})
