const {isAbsolute, resolve} = require('path')
const oscad = require('@jscad/scad-api')
const { prepareOutput } = require('../io/prepareOutput')
const { convertToBlob } = require('../io/convertToBlob')
const { rebuildSolid } = require('../core/rebuildSolid')
const { resolveIncludesFs } = require('../utils/resolveIncludesFs')
const getParameterDefinitionsCLI = require('./getParameterDefinitionsCLI')

/**
 * generate output data from source
 * @param {String} source the original source
 * @param {Object} params hash of parameters to pass to main function
 * @param {String} options
 * @return a Promise with the output data
 */
function generateOutputData (source, params, options) {
  const defaults = {
    implicitGlobals: true,
    outputFormat: 'stl',
    inputFile: ''
  }
  options = Object.assign({}, defaults, options)
  const {implicitGlobals, outputFormat, inputFile} = options

  const inputPath = isAbsolute(inputFile) ? inputFile : resolve(process.cwd(), inputFile)  // path.dirname(inputFile)

  let globals = {}
  if (implicitGlobals) {
    globals.oscad = oscad
  }
  globals.extras = {cli: {getParameterDefinitionsCLI}}

  // modify main to adapt parameters
  const mainFunction = `
//only add this wrapper if not already present & we are not in command-line mode
if(typeof wrappedMain === 'undefined' && typeof getParameterDefinitionsCLI !== 'undefined'){
  const wrappedMain = main
  main = function(){
    var paramsDefinition = (typeof getParameterDefinitions !== 'undefined') ? getParameterDefinitions : undefined
    return wrappedMain(getParameterDefinitionsCLI(paramsDefinition, ${JSON.stringify(params)}))
  }
}
`

  source = `${source}
  ${mainFunction}
  `

  // objects = rebuildSolid(source, '', params, globals, callback)
  return new Promise(function (resolve, reject) {
    const callback = (err, result) => {
      if (!err) {
        return resolve(result)
      }
      return reject(err)
    }

    if (outputFormat === 'jscad' || outputFormat === 'js') {
      resolve(source)
    } else {
      rebuildSolid(source, inputPath, params, callback, {implicitGlobals, globals, includeResolver: resolveIncludesFs})
    }
  })
    .then(function (objects) {
      //Buffer.from(outputData.data),{encoding: outputData.mimeType},
      return convertToBlob(prepareOutput(objects, {format: outputFormat}))
    })

// return convertToBlob(objects, {format: outputFormat, formatInfo: {convertCAG: true, convertCSG: true}})
}

module.exports = generateOutputData
