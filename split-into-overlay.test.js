const splitIntoOverlay = require('./split-into-overlay')

describe('splitIntoOverlay', () => {
    it('create an empty overlay definition by default', async () => {
        const overlay = splitIntoOverlay({})
        expect(overlay).toEqual({
            overlays: '1.0.0'
        })
    })


    it('should use exact value for "update"', async () => {
        const input = {
            one: {},
            two: null,
            three: '',
        }
        const overlay = splitIntoOverlay(input, {targets: '$.*'})
        expect(overlay).toEqual({
            overlays: '1.0.0',
            actions: [{
                target: '$["one"]',
                update: {}
            },{
                target: '$["two"]',
                update: null
            },{
                target: '$["three"]',
                update: ''
            }],
        })
    })


    it('should allow multiple paths', async () => {
        const input = {
            one: 1,
            two: 2
        }
        const overlay = splitIntoOverlay(input, {targets: ['$.one', '$.two']})
        expect(overlay).toEqual({
            overlays: '1.0.0',
            actions: [{
                target: '$["one"]',
                update: 1
            },{
                target: '$["two"]',
                update: 2
            }],
        })
    })

    it('should produce a jsonPath for each matched path and update', async () => {
        const input = {
            one: {},
            two: {},
            three: {
                four: 4
            }
        }
        const overlay = splitIntoOverlay(input, {targets: '$.*'})
        expect(overlay).toEqual({
            overlays: '1.0.0',
            actions: [
                {
                    target: '$["one"]',
                    update: {}
                },
                {
                    target: '$["two"]',
                    update: {}
                },
                {
                    target: '$["three"]',
                    update: {
                        four: 4
                    }
                }
            ]
        })
    })

    it('should support fields', async () => {
        const input = {
            paths: {
                '/foo': {
                    get: {
                        description: 'desc0',
                        summary: 'sum0',
                        operationId: 'getFoo'
                    },
                    post: {
                        description: 'desc1',
                        summary: 'sum1',
                        operationId: 'postFoo'
                    }
                }
            }
        }
        const overlay = splitIntoOverlay(input, {
            targets: '$.paths.*.*',
            fields: ['description', 'summary'],
        })
        expect(overlay).toEqual({
            overlays: '1.0.0',
            actions: [{
                target: '$["paths"]["/foo"]["get"]',
                update: {
                    description: 'desc0',
                    summary: 'sum0'
                }
            },{
                target: '$["paths"]["/foo"]["post"]',
                update: {
                    description: 'desc1',
                    summary: 'sum1'
                }
            }],
        })
    })


    it('should support where clause as JSONPath', async () => {
        const input = {
            paths: {
                '/foo': {
                    get: {
                        description: 'desc0',
                        summary: 'sum0',
                        tags: ['user']
                    },
                    post: {
                        description: 'desc1',
                        summary: 'sum1',
                        tags: ['pet']
                    }
                }
            }
        }
        const overlay = splitIntoOverlay(input, {
            targets: '$.paths.*.*',
            where: '$.tags[?(@ == "user")]'
        })

        expect(overlay).toEqual({
            overlays: '1.0.0',
            actions: [{
                target: '$["paths"]["/foo"]["get"]',
                update: {
                    description: 'desc0',
                    summary: 'sum0',
                    tags: ['user']
                }
            }],
        })
    })
})
