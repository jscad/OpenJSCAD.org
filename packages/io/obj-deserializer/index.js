const { colors, primitives } = require('@jscad/modeling')

const version = require('./package.json').version

/**
 * Deserializer of OBJ data to JSCAD geometries.
 * @module io/obj-deserializer
 * @example
 * const { deserializer, extension } = require('@jscad/obj-deserializer')
 */

/**
 * Parse the given OBJ data and return either a JSCAD script or a set of geometry
 * @see http://en.wikipedia.org/wiki/Wavefront_.obj_file
 * @param {Object} options - options used during deserializing, REQUIRED
 * @param {string} [options.filename='obj'] - filename of the original obj data
 * @param {string} [options.version='0.0.0'] - version number to add to the metadata
 * @param {boolean} [options.addMetadata=true] - toggle injection of metadata at the start of the script
 * @param {string} [options.output='script'] - either 'script' or 'geometry' to set desired output
 * @param  {string} input - obj data
 * @return {[object]/string} either a script (script) or a set of objects (geometry)
 * @alias module:io/obj-deserializer.deserialize
 */
const deserialize = (options, input) => {
  const defaults = {
    filename: 'obj',
    output: 'script',
    orientation: 'outward',
    version,
    addMetaData: true
  }
  options = Object.assign({}, defaults, options)
  const { output } = options

  options && options.statusCallback && options.statusCallback({ progress: 0 })

  const { positions, groups } = getGroups(input, options)

  const result = output === 'script' ? stringify(positions, groups, options) : objectify(positions, groups, options)

  options && options.statusCallback && options.statusCallback({ progress: 100 })

  return result
}

const getGroups = (data, options) => {
  let groups = []
  const positions = []
  let material = null

  groups.push({ faces: [], colors: [], name: 'default', line: 0 })

  const handleG = (command, values) => {
    const group = { faces: [], colors: [], name: '' }
    if (values && values.length > 0) group.name = values.join(' ')
    groups.push(group)
  }

  const handleV = (command, values) => {
    const x = parseFloat(values[0])
    const y = parseFloat(values[1])
    const z = parseFloat(values[2])
    positions.push([x, y, z])
  }

  const handleF = (command, values) => {
    // values : v/vt/vn
    const facerefs = values.map((value) => {
      const refs = value.match(/[0-9+\-eE]+/g)
      let ref = parseInt(refs[0])
      if (ref < 0) {
        ref = positions.length + ref
      } else {
        ref--
      }
      return ref
    })
    const group = groups.pop()
    group.faces.push(facerefs)
    group.colors.push(material)
    groups.push(group)
  }

  const handleMtl = (command, values) => {
    material = null
    if (values && values.length > 0) {
      // try to convert the material to a color by name
      const c = colors.colorNameToRgb(values[0])
      if (c) material = [c[0], c[1], c[2], 1] // add alpha
    }
  }

  // parse the input into groups of vertices and faces
  const lines = data.split(/\n/)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line && line.length > 0) {
      let values = line.match(/\S+/g)
      if (values) {
        const command = values[0]
        values = values.slice(1)
        switch (command) {
          case 'g':
            handleG(command, values)
            break
          case 'v':
            handleV(command, values)
            break
          case 'f':
            handleF(command, values)
            break
          case 'usemtl':
            handleMtl(command, values)
            break
        }
      }
    }
  }

  // filter out groups without geometry
  groups = groups.filter((group) => (group.faces.length > 0))

  return { positions, groups }
}

const objectify = (points, groups, options) => {
  const geometries = groups.map((group) => primitives.polyhedron({ orientation: options.orientation, points, faces: group.faces, colors: group.colors }))
  return geometries
}

const translatePoints = (points) => {
  let code = '  let points = [\n'
  points.forEach((point) => (code += `    [${point}],\n`))
  code += '  ]'
  return code
}

const translateFaces = (faces) => {
  let code = '  let faces = [\n'
  faces.forEach((face) => (code += `    [${face}],\n`))
  code += '  ]'
  return code
}

const translateColors = (colors) => {
  let code = '  let colors = [\n'
  colors.forEach((c) => {
    if (c) {
      code += `    [${c}],\n`
    } else {
      code += '    null,\n'
    }
  })
  code += '  ]'
  return code
}

const translateGroupsToCalls = (groups) => {
  let code = ''
  groups.forEach((group, index) => (code += `    group${index}(points), // ${group.name}\n`))
  return code
}

const translateGroupsToFunctions = (groups, options) => {
  let code = ''
  groups.forEach((group, index) => {
    const faces = group.faces
    const colors = group.colors
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
  const { filename, addMetaData, version } = options

  let code = addMetaData
    ? `//
// Produced by JSCAD IO Library : OBJ Deserializer (${version})
// date: ${new Date()}
// source: ${filename}
//
  `
    : ''

  // create the main function, with a list of points and translated groups
  code += `const {primitives} = require('@jscad/modeling')

// groups: ${groups.length}
// points: ${positions.length}
const main = () => {
  // points are common to all geometries
${translatePoints(positions)}

  let geometries = [
${translateGroupsToCalls(groups)}  ]
  return geometries
}

${translateGroupsToFunctions(groups, options)}
module.exports = {main}
`

  // create a function for each group
  return code
}

const extension = 'obj'

module.exports = {
  deserialize,
  extension
}
