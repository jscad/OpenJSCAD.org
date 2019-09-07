const { primitives } = require('@jscad/csg')

const { vt2jscad } = require('./vt2jscad')
const ObjReader = require('./ObjReader')

/**
 * Parse the given obj data and return either a JSCAD script or a CSG/CAG object
 * @see http://en.wikipedia.org/wiki/Wavefront_.obj_file
 * @param  {string} input obj data
 * @param {string} filename (optional) original filename of AMF source
 * @param {object} options options (optional) anonymous object with:
 * @param {string} [options.version='0.0.0'] version number to add to the metadata
 * @param {boolean} [options.addMetadata=true] toggle injection of metadata (producer, date, source) at the start of the file
 * @param {string} [options.output='jscad'] {String} either jscad or csg to set desired output
 * @return {CSG/string} either a CAG/CSG object or a string (jscad script)
 */
const deserialize = (input, filename, options) => {
  const defaults = {
    output: 'jscad',
    version: '0.0.0',
    addMetaData: true
  }
  options = Object.assign({}, defaults, options)
  const { output } = options

  options.filename = filename || 'obj'

  options && options.statusCallback && options.statusCallback({ progress: 0 })

  const { positions, faces } = getPositionsAndFaces(input, options)

  const result = output === 'jscad' ? stringify(positions, faces, options) : objectify(positions, faces, options)

  options && options.statusCallback && options.statusCallback({ progress: 100 })

  return result
}

const getPositionsAndFaces = (data, options) => {
  let positions = []
  let faces = []

  // setup the reader
  let reader = new ObjReader

  const handleV = (reader, command, values) => {
    let x = parseFloat(values[0])
    let y = parseFloat(values[1])
    let z = parseFloat(values[2])
    positions.push([x, y, z])
  }
  const handleF = (reader, command, values) => {
    // values : v/vt/vn
    let facerefs = values.map((value) => {
      let refs = value.match(/[0-9\+\-]+/g)
      let ref = parseInt(refs[0])
      if (ref < 0) {
        ref = positions.length + ref
      } else {
        ref--
      }
      return ref
    })
    faces.push(facerefs)
  }
  reader.absorb('v', handleV)
  reader.absorb('f', handleF)
  reader.write(data)

  return { positions, faces }
}

const objectify = (points, faces, options) => {
  return [primitives.polyhedron({ orientation: 'inward', points, faces })]
}

const stringify = (positions, faces, options) => {
  let { filename, addMetaData, version } = options

  let code = addMetaData ? `//
  // producer: OpenJSCAD.org Compatibility${version} OBJ deserializer
  // date: ${new Date()}
  // source: ${filename}
  //
  ` : ''

  code += `// objects: 1
// object #1: polygons: ${faces.length}
function main() { return
${vt2jscad(positions, faces)}
}
  `
  return code
}

module.exports = {
  deserialize
}
