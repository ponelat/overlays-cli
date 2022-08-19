const jsonPathWhere = require('./json-path-where')

describe('jsonPathWhere', () => {

    it('should act like jsonPath if now where', () => {

        const input = {
            one: 1,
            two: 1
        }

        expect(jsonPathWhere(input, '$.*')).toEqual([
            '/one',
            '/two'
        ])
    })

    it('should handle multiple paths', () => {

        const input = {
            one: 1,
            two: 1,
            three: 1,
        }

        expect(jsonPathWhere(input, ['$.one', '$.two'])).toEqual([
            '/one',
            '/two'
        ])
    })


    it('should handle a where clause', () => {

        const input = {
            one: {
                foo: true
            },
            two: {
                bar: false
            }
        }

        expect(jsonPathWhere(input, '$.*', '$.foo')).toEqual([
            '/one'
        ])
    })


})
