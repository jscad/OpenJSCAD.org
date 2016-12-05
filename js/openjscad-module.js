const fs = require('fs')
const path = require('path')

global.time = new Date()
global.lib = !fs.existsSync(global.lib) ? path.resolve(__dirname + '/', '..') + '/' : '/usr/local/lib/openjscad/' // for now hard-coded

const lib = global.lib
const formatsPath = path.resolve(lib, './formats.js')
const blobPath = path.resolve(lib, './Blob.js')
const openjscadPath = path.resolve(lib, './openjscad.js')
const openscadPath = path.resolve(lib, './openscad.js')

const CSG = require(formatsPath).CSG // use the CSG with extended prototypes
const CAG = require(formatsPath).CAG // use the CAG with extended prototypes
const Blob = require(blobPath).Blob

const OpenJsCad = require(openjscadPath).OpenJsCad
const openscad = require(openscadPath)
const evaluateSource = require('./utils/evaluateSource')

const meta = {
  producer: `OpenJSCAD ${OpenJsCad.version}`,
  date: new Date()
}

/**
 * compile openjscad code and generates intermediate representation
 * ordering of parameters created with curying in mind
 * @param  {Object} params the set of parameters to use
 * @param  {String} source the openjscad script we want to compile
 */
function compile (params = {}, source) {
  const modelingHelpers = fs.readFileSync(path.resolve(lib, './openscad.js')) // FIXME : UGHH these are helper functions, rename & handle better
  return evaluateSource(modelingHelpers, CAG, params, source)
}

/**
 * generate output file from intermediate representation
 * @param  {Object} ir the openjscad intermediate representation
 * @param  {String} outputFormat the output file format
 */
function generateOutput (ir, outputFormat) {
}

/**
 * converts from input file to output file
 * @param  {Object} ir the openjscad intermediate representation
 * @param  {String} outputFormat the output file format
 */
function convert (inputData, inputFormat, outputFormat) {
}

module.exports = { compile, generateOutput, convert}
