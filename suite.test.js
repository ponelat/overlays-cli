const fs = require('fs');
const path = require('path')
const jsYaml = require('js-yaml')
const {applyOverlay} = require('./index')

describe('Test Suite', () => {
    const testLocation = path.join(__dirname, "./test-suite");
    const allYmlFiles = getAllFiles(testLocation).filter(a => a.endsWith('.yml'))
    allYmlFiles.forEach(ymlFile => {
	const yml = jsYaml.load(fs.readFileSync(ymlFile, 'utf8'))
        const relativePath = ymlFile.slice(testLocation.length)
	describe(`${relativePath}`, () => {
            it(`${yml.test}`, async () => {
                const output = await applyOverlay(yml.input, makeResolver(yml.refs))
		expect(output).toEqual(yml.output)
            })

	})
    })
})

// Utils
function makeResolver(refs) {
    return async (uri) => {
        return refs[uri]
    }
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
