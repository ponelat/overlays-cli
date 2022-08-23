const fs = require('fs');
const path = require('path')
const jsYaml = require('js-yaml')
const applyOverlay = require('./apply-overlay')

describe('Overlays Test Suite', () => {
    const testLocation = path.join(__dirname, "./overlays-test-suite");
    const allYmlFiles = getAllFiles(testLocation).filter(a => a.endsWith('.yml'))
    const allTests = allYmlFiles.map(ymlFile => ({
        name: ymlFile.slice(testLocation.length),
        contents: jsYaml.load(fs.readFileSync(ymlFile, 'utf8')),
    }))

    const testsWithOnly = allTests.filter(t => t.contents.only)
    const testsToRun = testsWithOnly.length ? testsWithOnly : allTests

    testsToRun.forEach(({ contents, name }) => {
	if(!contents.skip) {
	    describe(`${name}`, () => {
		it(`${contents.test}`, async () => {
		    const output = await applyOverlay(contents.input, makeResolver(contents.refs))
		    expect(output).toEqual(contents.output)
		})

	    })
	}
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
