#!/usr/bin/env node

const axios = require('axios')
const getStdin = require('./get-stdin')
const applyOverlay = require('./apply-overlay')

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
    const overlay = jsYaml.load(await getStdin())
    const valid = validateOverlays(overlay)
    if(!valid) {
        throw validateOverlays.errors
    }

    const applied = await applyOverlay(overlay, extendsResolver)
    return jsYaml.dump(applied)
}

async function extendsResolver(url) {
    const {data} = await axios.get(url)
    if(typeof data === 'string')
        return jsYaml.load(data)
    return data
}
