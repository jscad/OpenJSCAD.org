const {isAbsolute, resolve} = require('path')
import oscad from '@jscad/scad-api'
import { convertToBlob } from '../io/convertToBlob'
import { rebuildSolid } from '../core/rebuildSolid'
import { resolveIncludesFs } from '../utils/resolveIncludesFs'
import getParameterDefinitionsCLI from './getParameterDefinitionsCLI'

/**
 * generate output data from source
 * @param {String} source the original source
 * @param {Object} params hash of parameters to pass to main function
 * @param {String} options
 * @return a Promise with the output data
 */
export default function generateOutputData (source, params, options) {
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
  const mainFunction = `var wrappedMain = main
  main = function(){
    var paramsDefinition = (typeof getParameterDefinitions !== 'undefined') ? getParameterDefinitions : undefined
    return wrappedMain(getParameterDefinitionsCLI(paramsDefinition, ${JSON.stringify(params)}))
  }`
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
      return convertToBlob(objects, {format: outputFormat})
    })

// return convertToBlob(objects, {format: outputFormat, formatInfo: {convertCAG: true, convertCSG: true}})
}
