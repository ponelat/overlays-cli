#!/usr/bin/env node

const getStdin = require('./get-stdin')
const jsYaml = require('js-yaml')

run().then(console.log, (err) => {
    console.error(err)
    process.exit(1)
})

async function run() {
    const input = jsYaml.load(await getStdin(), { schema: jsYaml.JSON_SCHEMA })
    return JSON.stringify(input)
    // return jsYaml.dump(input, {schema: jsYaml.JSON_SCHEMA, noRefs: true})
}
