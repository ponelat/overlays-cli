const get = require('./get.js')

describe('get', () => {

    it('should return input when given an empty array', () => {
        expect(get({one: 1}, [])).toEqual({one: 1})
    })

    it('should return value at path', () => {
        expect(get({one: 1}, ['one'])).toEqual(1)
    })


    it('should throw if not passed in an array', () => {
        const fn = () => get({one: 1}, null)
        expect(fn).toThrow('Path must be an array')
    })


})
