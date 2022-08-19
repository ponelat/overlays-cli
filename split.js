#!/usr/bin/env node

const getStdin = require('./get-stdin')
const splitIntoOverlay = require('./split-into-overlay')
const jsYaml = require('js-yaml')
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
	    target: {
		alias: 't',
		type: 'string',
		required: true,
		description: '(JSONPath): The target to add to overlay '
	    },
	    where: {
		alias: 'w',
		type: 'string',
		description: '(JSONPath): Where clause these sub-paths exist.'
	    },
	    field: {
		alias: 'f',
		type: 'array',
		description: 'Field(s) to include for update'
	    }}).parse()
}

async function cliParse(args) {
    const opts = argsToOpts(args)
    const {target, field: fields, where} = opts  
    const input = jsYaml.load(await getStdin(), {schema: jsYaml.JSON_SCHEMA})
    return {input, target, fields, where}
}

async function run() {
    const {input, target, fields, where} = await cliParse(process.argv)
    const overlay = splitIntoOverlay(input, { targets: target, fields, where })
    return jsYaml.dump(overlay, {schema: jsYaml.JSON_SCHEMA, noRefs: true})
}
