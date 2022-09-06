#!/usr/bin/env node

const getStdin = require('./get-stdin')
const applyOverlay = require('./apply-overlay')
const externalResolver = require('./external-resolver.js')

const overlaysSchema = require('./overlays.schema.json')
const jsYaml = require('js-yaml')
const validateOverlays = require('./validate-overlays.js')

run().then(console.log, (err) => {
    console.error(err)
    process.exit(1)
})

// Functions
async function run() {
    const overlay = jsYaml.load(await getStdin(), { schema: jsYaml.JSON_SCHEMA })
    const errors = validateOverlays(overlay)
    if(errors) {
	throw errors
    }

    const applied = await applyOverlay(overlay, externalResolver)
    return jsYaml.dump(applied, {schema: jsYaml.JSON_SCHEMA, noRefs: true})
}
