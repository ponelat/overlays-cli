#!/usr/bin/env node

const getStdin = require('./get-stdin')
const applyOverlay = require('./apply-overlay')
const externalResolver = require('./external-resolver.js')

const overlaysSchema = require('./overlays.schema.json')
const jsYaml = require('js-yaml')
const Ajv = require('ajv')
const ajv = new Ajv({allErrors: true}) // options can be passed, e.g. {allErrors: true}
const validateOverlays = ajv.compile(overlaysSchema)

run().then(console.log, (err) => {
    console.error(err)
    process.exit(1)
})

// Functions
async function run() {
    const overlay = jsYaml.load(await getStdin(), { schema: jsYaml.JSON_SCHEMA })
    const valid = validateOverlays(overlay)
    if(!valid) {
        throw validateOverlays.errors
    }

    const applied = await applyOverlay(overlay, externalResolver)
    return jsYaml.dump(applied, {schema: jsYaml.JSON_SCHEMA, noRefs: true})
}
