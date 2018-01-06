const {isAbsolute, resolve} = require('path')
const oscad = require('@jscad/scad-api')
const { prepareOutput } = require('../io/prepareOutput')
const { convertToBlob } = require('../io/convertToBlob')
const { rebuildSolid } = require('../core/rebuildSolid')
const { resolveIncludesFs } = require('../utils/resolveIncludesFs')
const getParameterDefinitionsCLI = require('./getParameterDefinitionsCLI')
const getParameterValues = require('./getParameterValues')

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
    outputFile: undefined,
    outputFormat: 'stl',
    inputFile: '',
    version: ''
  }
  options = Object.assign({}, defaults, options)
  const {implicitGlobals, outputFile, outputFormat, inputFile, inputFormat, version} = options

  const inputPath = isAbsolute(inputFile) ? inputFile : resolve(process.cwd(), inputFile)  // path.dirname(inputFile)

  let globals = {}
  if (implicitGlobals) {
    globals.oscad = oscad
  }
  globals.extras = {cli: {getParameterDefinitionsCLI}}

  // objects = rebuildSolid(source, '', params, globals, callback)
  return new Promise(function (resolve, reject) {
    const callback = (err, result) => {
      if (!err) {
        return resolve(result)
      }
      return reject(err)
    }

    // FIXME: technically almost 100% same as src/io/conversionWorker, refactor ?
    const conversionTable = {
      amf: data => require('@jscad/io').amfDeSerializer.deserialize(data.source, data.inputFile, options),
      obj: data => require('@jscad/io').objDeSerializer.deserialize(data.source, data.inputFile, options),
      gcode: data => require('@jscad/io').gcodeDeSerializer.deserialize(data.source, data.inputFile, options),
      stl: data => require('@jscad/io').stlDeSerializer.deserialize(data.source, data.inputFile, options),
      svg: data => require('@jscad/io').svgDeSerializer.deserialize(data.source, data.inputFile, options),
      json: data => require('@jscad/io').jsonDeSerializer.deserialize(data.source, data.inputFile, options),
      jscad: data => data.source,
      js: data => data.source,
      scad: data => {
        const source = !data.source.match(/^\/\/!OpenSCAD/i) ? '//!OpenSCAD\n' + data.source : data.source
        const parsed = require('@jscad/openscad-openjscad-translator').parse(source)
        return `//producer: OpenJSCAD ${version}
      // source: ${outputFile}
      ${parsed}`
      },
      undefined: data => reject(new Error(`unsuported input format ${inputFormat}`))
    }
    // convert any inputs
    source = conversionTable[inputFormat]({source, params, options})

    // extract the array of parameter definitions
    const parameterDefinitions = getParameterDefinitionsForReal(source)
    // get the actual parameters, correctly cast to the right types etc based on the definitions above
    params = getParameterValues(params, parameterDefinitions)

    // modify main to adapt parameters 
    // NOTE: this (getParameterDefinitionsCLI) also combines specified params with defaults
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
    source = inputFormat === 'jscad' ? `${source}
    ${mainFunction}` : source

    if (outputFormat === 'jscad' || outputFormat === 'js') {
      resolve(source)
    } else {
      rebuildSolid(source, inputPath, params, callback, {implicitGlobals, globals, includeResolver: resolveIncludesFs})
    }
  })
    .then(function (objects) {
      // Buffer.from(outputData.data),{encoding: outputData.mimeType},
      return convertToBlob(prepareOutput(objects, {format: outputFormat}))
    })

// return convertToBlob(objects, {format: outputFormat, formatInfo: {convertCAG: true, convertCSG: true}})
}

// actually get parameter definitions
function getParameterDefinitionsForReal (script) {
  let script1 = "if(typeof(getParameterDefinitions) == 'function') {return getParameterDefinitions();} else {return [];} "
  script1 += script
  const f = new Function(script1)
  const parameterDefinitions = f()
  // console.log('parameterDefinitions', parameterDefinitions)
  return parameterDefinitions
}

module.exports = generateOutputData
