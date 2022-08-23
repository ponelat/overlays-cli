const set = require('./set.js')

describe('set', () => {

    it('should throw if not passed in an array', () => {
        const fn = () => set({one: 1}, null, 2)
        expect(fn).toThrow('Path must be an array')
    })

    it('should return input', () => {
        expect(set({one: 1}, ['one'], 2)).toEqual({one: 2})
    })

    it('should return root if setting empty array', () => {
        expect(set({one: 1}, [], 'ok')).toEqual('ok')
    })

})
