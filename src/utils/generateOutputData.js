import convertToBlob from '../io/convertToBlob'
import {rebuildSolidSync} from '../jscad/rebuildSolid'
import getParameterDefinitionsCLI from './getParameterDefinitionsCLI'
import {formats} from '../io/formats'
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
    outputFormat: 'stl'
  }
  options = Object.assign({}, defaults, options)
  const {implicitGlobals, outputFormat} = options

  let globals = {}
  if (implicitGlobals) {
    globals.oscad = require('../modeling/index').default
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

  // objects = rebuildSolidSync(source, '', params, globals, callback)
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
      rebuildSolidSync(source, '', params, globals, callback)
    }
  })
    .then(function (objects) {
      const formatInfo = {
        convertCAG: true, convertCSG: true, mimetype: formats[outputFormat].mimetype
      }
      return convertToBlob(objects, {format: outputFormat, formatInfo})
    })

// return convertToBlob(objects, {format: outputFormat, formatInfo: {convertCAG: true, convertCSG: true}})
}
