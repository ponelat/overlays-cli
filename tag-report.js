#!/usr/bin/env node

const getStdin = require('./get-stdin')
const jsYaml = require('js-yaml')
const jsonPathWhere = require('./json-path-where')
const jsonPointerGet = require('./json-pointer-get')

run().then(console.log, (err) => {
    console.error(err)
    process.exit(1)
})

async function run() {
    const input = jsYaml.load(await getStdin(), { schema: jsYaml.JSON_SCHEMA })
    const tags = jsonPathWhere(input, '$.paths.*.*.tags[*]').reduce((acc, path) => {
	const tagName = jsonPointerGet(input, path)
	acc[tagName] = acc[tagName] || 0
	acc[tagName]++
	return acc
    }, {})

    return Object.entries(tags).sort(([key0, value0], [key1, value1]) => {
	if(value0 == value1)
	    return 0
	return value0 < value1 ? -1 : 1
    })

}
