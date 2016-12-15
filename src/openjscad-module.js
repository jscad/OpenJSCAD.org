'use strict' // only needed in node 4 & co , not in node > 6
const fs = require('fs')
const path = require('path')

const CAG = require('./csg').CAG

const evaluateSource = require('./utils/evaluateSource')
const convertToBlob = require('./io/convertToBlob')

/**
 * compile openjscad code and generates intermediate representation
 * ordering of parameters created with curying in mind
 * @param  {String} source the openjscad script we want to compile
 * @param  {Object} params the set of parameters to use  (optional)
 */
function compile (source, params) {
  params = params || {}
  const modelingHelpers = fs.readFileSync(path.resolve('./openscad.js')) // FIXME : UGHH these are helper functions, rename & handle better
  return evaluateSource(modelingHelpers, CAG, params, source)
}

/**
 * generate output file from intermediate representation
 * @param  {String} outputFormat the output file format
 * @param  {Object} objects the openjscad intermediate representation
 */
function generateOutput (outputFormat, objects) {
  return convertToBlob(objects, {format: outputFormat, formatInfo: {convertCAG: true, convertCSG: true}})
}

module.exports = { compile, generateOutput }
