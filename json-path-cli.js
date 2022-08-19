#!/usr/bin/env node

const getStdin = require('./get-stdin')
const jsYaml = require('js-yaml')
const jsonPathWhere = require('./json-path-where')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

run().then(console.log, (err) => {
    console.error(err)
    process.exit(1)
})

// Functions

function argsToOpts(args) {
    return yargs(hideBin(process.argv))
	.options({
	    path: {
		alias: 'p',
		type: 'array',
		required: true,
		description: '(JSONPath): The path to add to query over input '
	    },
	    where: {
		alias: 'w',
		type: 'string',
		description: '(JSONPath): Where clause to test if the sub-paths exist.'
	    }}).parse()
}

async function cliParse(args) {
    const opts = argsToOpts(args)
    const {path: paths, where} = opts  
    const input = jsYaml.load(await getStdin(), {schema: jsYaml.JSON_SCHEMA})
    return {input, paths, where}
}

async function run() {
    const {input, paths, where} = await cliParse(process.argv)
    const jsonPointers = paths.flatMap(path => jsonPathWhere(input, path, where))
    return jsonPointers.map(a => '#' + a).join('\n')
}
