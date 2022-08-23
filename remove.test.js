const remove = require('./remove')

describe('remove', () => {

    it('should return null if trying to remove root', () => {
        expect(remove({one: 1}, [])).toBe(null)
    })

    it('should unset value at path', () => {
        expect(remove({one: 1, two: 2}, ['one'])).toEqual({two: 2})
    })

    it('should throw if not passed in an array', () => {
        const fn = () => remove({one: 1}, null)
        expect(fn).toThrow('Path must be an array')
    })

    it('should mutate input', () => {
        const input = {one: 1}
        const result = remove(input, ['one'])
        expect(result).toEqual({})
        expect(result).toBe(input)
    })

    it('should slice array out of root', () => {
        expect(remove(['a', 'b', 'c'], [1])).toEqual(['a','c'])
    })

    it('should slice out the array item', () => {
        expect(remove({one: ['a', 'b', 'c']}, ['one', 1])).toEqual({one: ['a','c']})
    })

    it('should handle false attempt at removing array index', () => {
        expect(remove({one: ['a', 'b', 'c']}, ['one', 'two'])).toEqual({one: ['a','b','c']})
    })

})

