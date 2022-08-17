const fs = require('fs');
const path = require('path')
const jsYaml = require('js-yaml')
const jsonPath = require('./json-path')

describe('Overlays Test Suite', () => {
    const testLocation = path.join(__dirname, "./json-path-suite");
    const allYmlFiles = getAllFiles(testLocation).filter(a => a.endsWith('.yml'))
    allYmlFiles.forEach(ymlFile => {
	const yml = jsYaml.load(fs.readFileSync(ymlFile, 'utf8'))
        const relativePath = ymlFile.slice(testLocation.length)
	if(!yml.skip) {
	    describe(`${relativePath}`, () => {
		it(`${yml.test}`, async () => {
                    const {input, query} = yml
		    const output = jsonPath(input, query, jsonPointerBuilder)
		    expect(output).toEqual(yml.output)

		})

	    })
	}
    })
})

function jsonPointerBuilder(segment, basePath='#') {
    if(typeof segment === 'undefined')
        return '#'
    segment = (segment+'').replace(/~/g, '~0').replace(/\//g, '~1')
    return `${basePath}/${segment}`
}

function getAllFiles(dirPath, arrayOfFiles=[]) {
  files = fs.readdirSync(dirPath)

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file))
    }
  })

  return arrayOfFiles
}
