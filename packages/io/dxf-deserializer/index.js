/*
## License

Copyright (c) 2017 Z3 Development https://github.com/z3dev

All code released under MIT license

*/

const { ensureString } = require('@jscad/io-utils')

const version = require('./package.json').version

const { BYLAYER, getTLA } = require('./autocad')
const colorIndex = require('./colorindex2017')
const dxf = require('./DxfReader')
const { instantiateAsciiDxf } = require('./instantiate')
const translateAsciiDxf = require('./translate')

// //////////////////////////////////////////
//
// DXF (Drawing Exchange Format) is a CAD data file format developed by Autodesk
//
// //////////////////////////////////////////

/**
 * Deserializer of DXF data to JSCAD geometries.
 * @module io/dxf-deserializer
 * @example
 * const { deserialize, extension } = require('@jscad/dxf-deserializer')
 */

const handleError = (reader, error) => {
  if (reader.options.strict === true) {
    throw error
  } else {
    console.log(`error: line ${error.line}, column ${error.column}, bad character [${error.c}]`)
  }
}

const handleStart = (reader, data) => {
  // console.log('DXF reader started')
}

const handleEnd = (reader, data) => {
  // console.log('DXF reader completed')
}

//
// handle a entity as provided by the reader
// groups: 0
// special handling to set defaults as per DXF specifications
//
const handleEntity = (reader, group, value) => {
  // console.log('entity: '+group+','+value)

  let obj = null
  switch (value) {
    case 'LAYER':
      obj = { type: 'layer' }
      // entity defaults
      obj[getTLA(48)] = 1.0
      obj[getTLA(60)] = 0
      // obj[getTLA(62)] = 256
      obj[getTLA(67)] = 0
      // layer defaults
      reader.objstack.push(obj)
      break
    case 'LINE':
      obj = { type: 'line' }
      // entity defaults
      obj[getTLA(48)] = 1.0
      obj[getTLA(60)] = 0
      obj[getTLA(62)] = BYLAYER
      obj[getTLA(67)] = 0
      // line defaults
      obj[getTLA(210)] = 0
      obj[getTLA(220)] = 0
      obj[getTLA(230)] = 0

      reader.objstack.push(obj)
      break
    case 'LWPOLYLINE':
      obj = { type: 'lwpolyline' }
      // entity defaults
      obj[getTLA(48)] = 1.0
      obj[getTLA(60)] = 0
      obj[getTLA(62)] = BYLAYER
      obj[getTLA(67)] = 0
      // lwpolyline defaults
      obj[getTLA(38)] = 0
      obj[getTLA(39)] = 0
      obj[getTLA(43)] = 0
      obj[getTLA(70)] = 0
      obj[getTLA(90)] = 0
      obj[getTLA(210)] = 0
      obj[getTLA(220)] = 0
      obj[getTLA(230)] = 1

      reader.objstack.push(obj)
      break
    case 'MESH':
      obj = { type: 'mesh' }
      // entity defaults
      obj[getTLA(48)] = 1.0
      obj[getTLA(60)] = 0
      obj[getTLA(62)] = BYLAYER
      obj[getTLA(67)] = 0
      // mesh defaults
      obj[getTLA(91)] = 0 // initialize lengths
      obj[getTLA(92)] = 0
      obj[getTLA(93)] = 0
      obj[getTLA(94)] = 0
      obj[getTLA(95)] = 0
      obj.state = 0 // keep a state
      reader.objstack.push(obj)
      break
    case 'POLYLINE':
      obj = { type: 'polyline' }
      // entity defaults
      obj[getTLA(48)] = 1.0
      obj[getTLA(60)] = 0
      obj[getTLA(62)] = BYLAYER
      obj[getTLA(67)] = 0
      // polyline defaults
      obj[getTLA(10)] = 0
      obj[getTLA(20)] = 0
      obj[getTLA(30)] = 0
      obj[getTLA(39)] = 0
      obj[getTLA(40)] = 0
      obj[getTLA(41)] = 0
      obj[getTLA(70)] = 0
      obj[getTLA(71)] = 0
      obj[getTLA(72)] = 0
      obj[getTLA(73)] = 0
      obj[getTLA(74)] = 0
      obj[getTLA(75)] = 0
      obj[getTLA(210)] = 0
      obj[getTLA(220)] = 0
      obj[getTLA(230)] = 1

      reader.objstack.push(obj)
      break
    case 'ARC':
      obj = { type: 'arc' }
      // entity defaults
      obj[getTLA(48)] = 1.0
      obj[getTLA(60)] = 0
      obj[getTLA(62)] = BYLAYER
      obj[getTLA(67)] = 0
      // arc defaults
      obj[getTLA(39)] = 0
      obj[getTLA(210)] = 0
      obj[getTLA(220)] = 0
      obj[getTLA(230)] = 1

      reader.objstack.push(obj)
      break
    case 'CIRCLE':
      obj = { type: 'circle' }
      // entity defaults
      obj[getTLA(48)] = 1.0
      obj[getTLA(60)] = 0
      obj[getTLA(62)] = BYLAYER
      obj[getTLA(67)] = 0
      // circle defaults
      obj[getTLA(39)] = 0
      obj[getTLA(210)] = 0
      obj[getTLA(220)] = 0
      obj[getTLA(230)] = 1

      reader.objstack.push(obj)
      break
    case 'ELLIPSE':
      obj = { type: 'ellipse' }
      // entity defaults
      obj[getTLA(48)] = 1.0
      obj[getTLA(60)] = 0
      obj[getTLA(62)] = BYLAYER
      obj[getTLA(67)] = 0
      // ellipse defaults
      obj[getTLA(210)] = 0
      obj[getTLA(220)] = 0
      obj[getTLA(230)] = 1

      reader.objstack.push(obj)
      break
    case 'VERTEX':
      obj = { type: 'vertex' }
      // entity defaults
      obj[getTLA(48)] = 1.0
      obj[getTLA(60)] = 0
      obj[getTLA(62)] = BYLAYER
      obj[getTLA(67)] = 0
      // vertex defaults
      obj[getTLA(10)] = 0
      obj[getTLA(20)] = 0
      obj[getTLA(30)] = 0
      obj[getTLA(40)] = 0
      obj[getTLA(41)] = 0
      obj[getTLA(42)] = 0
      obj[getTLA(70)] = 0
      // polyface defaults (optional)
      obj[getTLA(71)] = 0
      obj[getTLA(72)] = 0
      obj[getTLA(73)] = 0
      obj[getTLA(74)] = 0

      reader.objstack.push(obj)
      break
    case '3DFACE':
      obj = { type: '3dface' }
      // entity defaults
      obj[getTLA(48)] = 1.0
      obj[getTLA(60)] = 0
      obj[getTLA(62)] = BYLAYER
      obj[getTLA(67)] = 0
      // face defaults
      obj[getTLA(70)] = 0

      reader.objstack.push(obj)
      break
    case 'SEQEND':
      obj = { type: 'seqend' }
      reader.objstack.push(obj)
      break
    default:
      // push on an anonymous object which does not have type / attributes / values
      obj = {}
      reader.objstack.push(obj)
      break
  }
}

//
// handle a varible as provided by the reader
// groups: 9
//
const handleVariable = (reader, group, value) => {
  // console.log('variable: '+group+','+value)
  const obj = { type: 'variable', name: value }
  reader.objstack.push(obj)
}

//
// handle a int as provided by the reader
// groups: 62, 70, 71, 72, 73, 74, 75, 210, 220, 230
//
const handleInt = (reader, group, value) => {
  // console.log('int: '+group+','+value)
  const obj = reader.objstack.pop()
  if ('type' in obj) {
    obj[getTLA(group)] = parseFloat(value)
  }
  reader.objstack.push(obj)
}

//
// handle a double as provided by the reader
// groups: 11, 12, 13, 21, 22, 23, 31, 32, 33, 39, 40, 41, 50, 51
//
const handleDouble = (reader, group, value) => {
  // console.log('double: '+group+','+value)
  const obj = reader.objstack.pop()
  if ('type' in obj) {
    obj[getTLA(group)] = parseFloat(value)
  }
  reader.objstack.push(obj)
}

//
// handle a X coordinate as provided by the reader
// groups: 10
// special handling of (lwpolyline and mesh) float values
//
const handleXcoord = (reader, group, value) => {
  // console.log('xcoord: '+group+','+value)
  const obj = reader.objstack.pop()
  if ('type' in obj) {
    if (obj.type === 'lwpolyline') {
      // special handling to build a list of vertices
      if (obj.pptxs === undefined) {
        obj.pptxs = []
        obj.bulgs = []
      }
      obj.pptxs.push(parseFloat(value))
      obj.bulgs.push(0)
    } else {
      if (obj.type === 'mesh') {
        // special handling to build a list of vertices
        if (obj.pptxs === undefined) {
          obj.pptxs = []
        }
        obj.pptxs.push(parseFloat(value))
      } else {
        obj[getTLA(group)] = parseFloat(value)
      }
    }
  }
  reader.objstack.push(obj)
}

//
// handle a Y coordinate as provided by the reader
// groups: 20
// special handling of (lwpolyline and mesh) float values
//
const handleYcoord = (reader, group, value) => {
  // console.log('ycoord: '+group+','+value)
  const obj = reader.objstack.pop()
  if ('type' in obj) {
    if (obj.type === 'lwpolyline' || obj.type === 'mesh') {
      // special handling to build a list of vertices
      if (obj.pptys === undefined) {
        obj.pptys = []
      }
      obj.pptys.push(parseFloat(value))
    } else {
      obj[getTLA(group)] = parseFloat(value)
    }
  }
  reader.objstack.push(obj)
}

//
// handle a Z coordinate as provided by the reader
// groups: 30
// special handling of (mesh) float values
//
const handleZcoord = (reader, group, value) => {
  // console.log('ycoord: '+group+','+value)
  const obj = reader.objstack.pop()
  if ('type' in obj) {
    if (obj.type === 'mesh') {
      // special handling to build a list of vertices
      if (obj.pptzs === undefined) {
        obj.pptzs = []
      }
      obj.pptzs.push(parseFloat(value))
    } else {
      obj[getTLA(group)] = parseFloat(value)
    }
  }
  reader.objstack.push(obj)
}

//
// handle a bulge as provided by the reader
// groups: 41
// special handling of (lwpolyline) float values
//
const handleBulge = (reader, group, value) => {
  // console.log('bulg: '+group+','+value)
  const obj = reader.objstack.pop()
  if ('type' in obj) {
    if (obj.type === 'lwpolyline') {
      // special handling to build a list of vertices
      const bulgs = obj.bulgs
      if (bulgs !== undefined) {
        const pptxs = obj.pptxs
        if (pptxs.length === bulgs.length) {
          bulgs[bulgs.length - 1] = parseFloat(value)
        }
      }
    } else {
      obj[getTLA(group)] = parseFloat(value)
    }
  }
  reader.objstack.push(obj)
}

//
// handle a len as provided by the reader
// groups: 91, 92, 93, 94, 95
// special handling of (mesh) float values based on group and state
//
const handleLen = (reader, group, value) => {
  // console.log('len: '+group+','+value)
  const obj = reader.objstack.pop()
  if ('type' in obj) {
    if (obj.type === 'mesh') {
      // mesh has an order of lengths
      const state = obj.state
      // console.log('mesh len: '+group+','+value+','+state)
      switch (group) {
        case 91: // length of subdivisions
          obj[getTLA(group)] = parseFloat(value)
          obj.state = 1
          break
        case 92: // vertex count OR overriden property count
          if (state === 1) {
            obj.vlen = parseFloat(value) // override attribute
            obj.state = 2
          } else {
            obj.plen = parseFloat(value) // override attribute
            obj.state = 6
          }
          break
        case 93: // face count
          obj[getTLA(group)] = parseFloat(value)
          obj.state = 3
          break
        case 94: // edge count
          obj[getTLA(group)] = parseFloat(value)
          obj.state = 4
          break
        case 95: // edge crease count
          obj[getTLA(group)] = parseFloat(value)
          obj.state = 5
          break
        default:
          obj.state = 7
          break
      }
    } else {
      obj[getTLA(group)] = parseFloat(value)
    }
  }
  reader.objstack.push(obj)
}

//
// handle a value as provided by the reader
// groups: 90
// special handling of (mesh) float values based on state
//
const handleValue = (reader, group, value) => {
  // console.log('int: '+group+','+value)
  const obj = reader.objstack.pop()
  if ('type' in obj) {
    if (obj.type === 'mesh') {
      const state = obj.state
      // console.log('mesh value: '+group+','+value+','+state)
      // mesh has an order of values based on state
      switch (state) {
        case 3: // accumulate face values
          if (obj.fvals === undefined) {
            obj.fvals = []
          }
          obj.fvals.push(parseFloat(value))
          break
        case 4: // accumulate edge values
          if (obj.evals === undefined) {
            obj.evals = []
          }
          obj.evals.push(parseFloat(value))
          break
        default:
          break
      }
    } else {
      obj[getTLA(group)] = parseFloat(value)
    }
  }
  reader.objstack.push(obj)
}

//
// handle a string as provided by the reader
// groups: 1,6,7,8,
//
const handleString = (reader, group, value) => {
  // console.log('string: '+group+','+value)
  const obj = reader.objstack.pop()
  if ('type' in obj) {
    obj[getTLA(group)] = value
  }
  reader.objstack.push(obj)
}

//
// handle a name as provided by the reader
// groups: 2,3
//
const handleName = (reader, group, value) => {
  // console.log('name: '+group+','+value)
  const obj = reader.objstack.pop()
  if ('type' in obj) {
    if (obj[getTLA(group)] === undefined) {
      obj[getTLA(group)] = value
    }
  }
  reader.objstack.push(obj)
}

//
// Create a DXF reader using the given source and options.
// This routine sets up a series of callbacks (absorb calls) to handle the various DXF groups, then starts the reader.
// While reading, the callback routine (handle*) converts the value and then:
// - pushes a new group onto the objstack
// OR
// - adds a new attribute to the current object
//
const createReader = (src, options) => {
  // create a reader for the DXF
  const reader = dxf.reader(options)

  // setup event handling from the reader
  reader.on('error', handleError)
  reader.on('start', handleStart)
  reader.on('end', handleEnd)

  // setup group handling
  reader.absorb(0, handleEntity)
  reader.absorb(1, handleString)
  reader.absorb(2, handleName)
  reader.absorb(3, handleName)
  reader.absorb(6, handleString)
  reader.absorb(7, handleString)
  reader.absorb(8, handleString)
  reader.absorb(9, handleVariable)
  reader.absorb(10, handleXcoord)
  reader.absorb(11, handleDouble)
  reader.absorb(12, handleDouble)
  reader.absorb(13, handleDouble)
  reader.absorb(20, handleYcoord)
  reader.absorb(21, handleDouble)
  reader.absorb(22, handleDouble)
  reader.absorb(23, handleDouble)
  reader.absorb(30, handleZcoord)
  reader.absorb(31, handleDouble)
  reader.absorb(32, handleDouble)
  reader.absorb(33, handleDouble)
  reader.absorb(39, handleDouble)
  reader.absorb(40, handleDouble)
  reader.absorb(41, handleDouble)
  reader.absorb(42, handleBulge)
  reader.absorb(50, handleDouble)
  reader.absorb(51, handleDouble)
  reader.absorb(62, handleInt)
  reader.absorb(70, handleInt)
  reader.absorb(71, handleInt)
  reader.absorb(72, handleInt)
  reader.absorb(73, handleInt)
  reader.absorb(74, handleInt)
  reader.absorb(75, handleInt)
  reader.absorb(90, handleValue)
  reader.absorb(91, handleLen) // MESH
  reader.absorb(92, handleLen) // MESH
  reader.absorb(93, handleLen) // MESH
  reader.absorb(94, handleLen) // MESH
  reader.absorb(95, handleLen) // MESH
  reader.absorb(210, handleInt)
  reader.absorb(220, handleInt)
  reader.absorb(230, handleInt)

  // initial state
  reader.objstack = []
  reader.objstack.push({ type: 'dxf' })

  // start the reader
  reader.write(src).close()
  return reader
}

//
// instantiate the give DXF definition (src) into a set of CSG library objects
//
const instantiate = (src, options) => {
  const reader = createReader(src, options)
  const objs = instantiateAsciiDxf(reader, options)
  return objs
}

//
// translate the give DXF definition (src) into a  JSCAD script
//
const translate = (src, options) => {
  const reader = createReader(src, options)

  let code = `// Produced by JSCAD IO Library : DXF Deserializer (${options.version})

`
  // code += '// date: ' + (new Date()) + '\n'
  // code += '// source: ' + options.filename + '\n'
  code += translateAsciiDxf(reader, options)
  return code
}

/**
 * Deserialize the given DXF source into either a script or an array of geometry
 * @param {Object} options - options used during deserializing, REQUIRED
 * @param {string} [options.filename='dxf'] - filename of original DXF data stream
 * @param {String} [options.version] - version added to the script metadata, default is package version
 * @param {string} [options.output='script'] - either 'script' or 'geometry' to set desired output
 * @param {boolean} [options.strict=true] - obey strict DXF specifications
 * @param {array} [options.colorindex=[]] - list of colors (256) for use during rendering
 * @param {string} src - DXF data stream
 * @return {string|[objects]} a string (script) or array of objects (geometry)
 * @alias module:io/dxf-deserializer.deserialize
 */
const deserialize = (options, src) => {
  const defaults = {
    filename: 'dxf',
    version,
    output: 'script',
    strict: true,
    colorindex: colorIndex,
    dxf: {
      angdir: 0, // counter clockwise
      insunits: 4, // millimeters
      pfacevmax: 4 // number of vertices per face
    }
  }
  options = Object.assign({}, defaults, options)

  src = ensureString(src)
  return options.output === 'script' ? translate(src, options) : instantiate(src, options)
}

const extension = 'dxf'

module.exports = {
  deserialize,
  extension
}
