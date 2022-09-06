const axios = require('axios')
const fs = require('fs')
const jsYaml = require('js-yaml')

module.exports = async function externalResolver(url) {
    if(url.startsWith('.')) {
	return jsYaml.load(fs.readFileSync(url, 'utf8'), { schema: jsYaml.JSON_SCHEMA })
    }
    const {data} = await axios.get(url)
    if(typeof data === 'string')
        return jsYaml.load(data, { schema: jsYaml.JSON_SCHEMA})
    return data
}
