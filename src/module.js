import convertToBlob from './io/convertToBlob'
import { rebuildSolidSync } from './jscad/rebuildSolid'
import oscad from './modeling/index'

/**
 * compile openjscad code and generates intermediate representation
 * ordering of parameters created with curying in mind
 * @param  {String} source the openjscad script we want to compile
 * @param  {Object} params the set of parameters to use for the script  (optional)
 * @param  {Object} options the set of options to use (optional)

 */
function compile (source, params, options) {
  params = params || {}
  const defaults = {
    implicitGlobals: true
  }
  options = Object.assign({}, defaults, options)
  const {implicitGlobals} = options
  let globals = {}
  if (implicitGlobals) {
    globals.oscad = oscad
  }

  return new Promise(function (resolve, reject) {
    const callback = (err, result) => {
      if (!err) { return resolve(result) }
      reject(err)
    }
    rebuildSolidSync(source, '', params, callback, {implicitGlobals, globals})
  })
}

/**
 * generate output file from intermediate representation
 * @param  {String} outputFormat the output file format
 * @param  {Object} objects the openjscad intermediate representation
 */
function generateOutput (outputFormat, objects) {
  return convertToBlob(objects, {format: outputFormat, formatInfo: {convertCAG: true, convertCSG: true}})
}

module.exports = {generateOutput, compile}
