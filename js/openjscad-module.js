'use strict'// only needed in node 4 & co , not in node > 6
const fs = require('fs')
const path = require('path')

//FIXME: EEEK !!! horrible hack
global.time = new Date()
global.lib = !fs.existsSync(global.lib) ? path.resolve(__dirname + '/', '..') + '/' : '/usr/local/lib/openjscad/' // for now hard-coded
const lib = global.lib
const openjscadPath = path.resolve(lib, './openjscad.js')
//const openscadPath = path.resolve(lib, './openscad.js')

const CSG = require('../formats').CSG // use the CSG with extended prototypes
const CAG = require('../formats').CAG // use the CAG with extended prototypes
const Blob = require('../Blob').Blob

const OpenJsCad = require(openjscadPath).OpenJsCad
const openscad = require('../openscad.js')

const evaluateSource = require('./utils/evaluateSource')
//const generateOutputData = require('./utils/generateOutputData')

/**
 * compile openjscad code and generates intermediate representation
 * ordering of parameters created with curying in mind
 * @param  {String} source the openjscad script we want to compile
 * @param  {Object} params the set of parameters to use  (optional)
 */
function compile (source, params) {
  params = params || {}
  const modelingHelpers = fs.readFileSync(path.resolve(lib, './openscad.js')) // FIXME : UGHH these are helper functions, rename & handle better
  return evaluateSource(modelingHelpers, CAG, params, source)
}

/**
 * generate output file from intermediate representation
 * @param  {String} outputFormat the output file format
 * @param  {Object} ir the openjscad intermediate representation
 */
function generateOutput (outputFormat, ir) {
  const meta = {
    producer: `OpenJSCAD ${OpenJsCad.version}`,
    date: new Date()
  }
  // FIXME : partial code duplication with utils/generateOutputData
  const csgObject = ir
  const outputFormatHandlers = {
    'amf': () => csgObject.toAMFString(meta), // CSG to AMF
    'stlb': () => csgObject.toStlBinary(), // CSG to STL BINARY
    'stl': () => csgObject.toStlString(), // CSG to STL ASCII
    'stla': () => csgObject.toStlString(), // CSG to STL ASCII
    'dxf': () => csgObject.toDxf(), // CAG to DXF
    'svg': () => csgObject.toSvg(), // CAG to SVG
    'x3d': () => csgObject.toX3D(), // CSG to X3D Only possible via browsers
    'json': () => csgObject.toJSON(), // CSG or CAG to JSON
    undefined: () => {
      throw new Error('ERROR: only jscad, stl, amf, dxf, svg or json as output format')
    }
  }
  const data = outputFormatHandlers[outputFormat]()
  return data
}

module.exports = { compile, generateOutput }
