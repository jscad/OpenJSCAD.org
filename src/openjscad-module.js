'use strict' // only needed in node 4 & co , not in node > 6
const fs = require('fs')
const path = require('path')
const evaluateSource = require('./utils/evaluateSource')
const convertToBlob = require('./io/convertToBlob').default

/**
 * compile openjscad code and generates intermediate representation
 * ordering of parameters created with curying in mind
 * @param  {String} source the openjscad script we want to compile
 * @param  {Object} params the set of parameters to use  (optional)
 */
function compile (source, params, options) {
  params = params || {}
  // const modelingHelpers = fs.readFileSync(path.resolve('./openscad.js')) // FIXME : UGHH these are helper functions, rename & handle better
  const defaults = {
    implicitGlobals: true
  }
  options = Object.assign({}, defaults, options)
  const {implicitGlobals} = options

  let globals
  if (implicitGlobals) {
    globals = {
      oscad: require('./modeling/index').default
    }
  }
  const rebuildSolidSync = require('./jscad/rebuildSolid').rebuildSolidSync

  return new Promise(function (resolve, reject) {
    const callback = (err, result) => {
      if (!err) { return resolve(result) }
      reject(err)
    }
    rebuildSolidSync(source, '', params, globals, callback)
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

module.exports = { compile, generateOutput}
