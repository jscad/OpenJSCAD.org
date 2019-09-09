const { color, primitives } = require('@jscad/csg')

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
    orientation: 'outward',
    version: '0.0.0',
    addMetaData: true
  }
  options = Object.assign({}, defaults, options)
  const { output } = options

  options.filename = filename || 'obj'

  options && options.statusCallback && options.statusCallback({ progress: 0 })

  const { positions, groups } = getGroups(input, options)

  const result = output === 'jscad' ? stringify(positions, groups, options) : objectify(positions, groups, options)

  options && options.statusCallback && options.statusCallback({ progress: 100 })

  return result
}

const getGroups = (data, options) => {
  let groups = []
  let positions = []
  let material = null

  groups.push({ faces: [], colors: [], name: 'default', line: 0 })

  // setup the reader
  let reader = new ObjReader()

  const handleG = (reader, command, values) => {
    let group = { faces: [], colors: [], name: '' }
    if (values && values.length > 0) group.name = values.join(' ')
    groups.push(group)
  }
  const handleV = (reader, command, values) => {
    let x = parseFloat(values[0])
    let y = parseFloat(values[1])
    let z = parseFloat(values[2])
    positions.push([x, y, z])
  }
  const handleF = (reader, command, values) => {
    // values : v/vt/vn
    let facerefs = values.map((value) => {
      let refs = value.match(/[0-9\+\-eE]+/g)
      let ref = parseInt(refs[0])
      if (ref < 0) {
        ref = positions.length + ref
      } else {
        ref--
      }
      return ref
    })
    let group = groups.pop()
    group.faces.push(facerefs)
    group.colors.push(material)
    groups.push(group)
  }
  const handleMtl = (reader, command, values) => {
    material = null
    if (values && values.length > 0) {
      // try to convert the material to a color by name
      let c = color.colorNameToRgb(values[0])
      if (c) material = [c[0], c[1], c[2], 1] // add alpha
    }
  }
  reader.absorb('g', handleG)
  reader.absorb('v', handleV)
  reader.absorb('f', handleF)
  reader.absorb('usemtl', handleMtl)
  reader.write(data)

  // filter out groups without geometry
  groups = groups.filter((group) => (group.faces.length > 0))

  return { positions, groups }
}

const objectify = (points, groups, options) => {
  const geometries = groups.map((group) => {
    return primitives.polyhedron({ orientation: options.orientation, points, faces: group.faces, colors: group.colors })
  })
  return geometries
}

const translatePoints = (points) => {
  let code = '  let points = [\n'
  points.forEach((point) => code += `    [${point}],\n`)
  code += '  ]'
  return code
}

const translateFaces = (faces) => {
  let code = '  let faces = [\n'
  faces.forEach((face) => code += `    [${face}],\n`)
  code += '  ]'
  return code
}

const translateColors = (colors) => {
  let code = '  let colors = [\n'
  colors.forEach((c) => {
    if (c) {
      code += `    [${c}],\n`
    } else {
      code += `    null,\n`
    }
  })
  code += '  ]'
  return code
}

const translateGroupsToCalls = (groups) => {
  let code = ''
  groups.forEach((group, index) => code += `    group${index}(points), // ${group.name}\n`)
  return code
}

const translateGroupsToFunctions = (groups, options) => {
  let code = ''
  groups.forEach((group, index) => {
    let faces = group.faces
    let colors = group.colors
    code += `
// group : ${group.name}
// faces: ${faces.length}
`
    code += `const group${index} = (points) => {
${translateFaces(faces)}
${translateColors(colors)}
  return primitives.polyhedron({ orientation: '${options.orientation}', points, faces, colors })
}
`
  })
  return code
}

const stringify = (positions, groups, options) => {
  let { filename, addMetaData, version } = options

  let code = addMetaData ? `//
// producer: OpenJSCAD.org Compatibility${version} OBJ deserializer
// date: ${new Date()}
// source: ${filename}
//
  ` : ''

  // create the main function, with a list of points and translated groups
  code += `// groups: ${groups.length}
// points: ${positions.length}
function main() {
  // points are common to all geometries
${translatePoints(positions)}

  let geometries = [
${translateGroupsToCalls(groups)}  ]
  return geometries
}

${translateGroupsToFunctions(groups, options)}
`

  // create a function for each group
  return code
}

module.exports = {
  deserialize
}
