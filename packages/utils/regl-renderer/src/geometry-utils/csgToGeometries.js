const vec3 = require('gl-vec3')

const { toArray } = require('@jscad/array-utils')

/**
 * convert a CSG from csg.js to an array of geometries with positions, normals, colors & indices
 * typically used for example to display the csg data in a webgl wiever
 * @param {Array} csgs single or an array of CSG object
 * @param {Object} options options hash
 * @param {Boolean} options.smoothLighting=false set to true if we want to use interpolated vertex normals
 * this creates nice round spheres but does not represent the shape of the actual model
 * @param {Float} options.normalThreshold=0.349066 threshold beyond which to split normals // 20 deg
 * @param {String} options.faceColor='#FF000' hex color
 * @returns {Object} {indices, positions, normals, colors}
 */
const csgToGeometries = (csgs, options) => {
  const defaults = {
    smoothLighting: false, // set to true if we want to use interpolated vertex normals this creates nice round spheres but does not represent the shape of the actual model
    normalThreshold: 0.349066, // 20 deg
    faceColor: [1, 0.4, 0, 1]// default color
  }
  const { smoothLighting, normalThreshold, faceColor } = Object.assign({}, defaults, options)
  const faceColorRgb = faceColor === undefined ? undefined : normalizedColor(faceColor) // TODO : detect if hex or rgba

  const convert = (csg) => {
    const geometries = []

    const positions = []
    const colors = []
    const normals = []
    const indices = []

    // flag for transparency
    let isTransparent = false

    const polygons = csg.canonicalized().toPolygons()

    /* let positions = new Float32Array(faces * 3 * 3)
    let normals = new Float32Array(faces * 3 * 3) */

    let normalPositionLookup = []
    normalPositionLookup = {}
    let tupplesIndex = 0

    for (let i = 0; i < polygons.length; i++) {
      const polygon = polygons[i]

      const color = polygonColor(polygon, faceColorRgb)
      const rawNormal = polygon.plane.normal
      const normal = [rawNormal.x, rawNormal.y, rawNormal.z]

      if (color[3] !== 1) {
        isTransparent = true
      }

      const polygonIndices = []
      // we need unique tupples of normal + position , that gives us a specific index (indices)
      // if the angle between a given normal and another normal is less than X they are considered the same
      for (let j = 0; j < polygon.vertices.length; j++) {
        let index

        const vertex = polygon.vertices[j]
        const position = [vertex.pos.x, vertex.pos.y, vertex.pos.z]

        if (smoothLighting) {
          const candidateTupple = { normal, position }
          const existingTupple = fuzyNormalAndPositionLookup(normalPositionLookup, candidateTupple, normalThreshold)
          if (!existingTupple) {
            const existingPositing = normalPositionLookup[candidateTupple.position]
            const itemToAdd = [{ normal: candidateTupple.normal, index: tupplesIndex }]
            if (!existingPositing) {
              normalPositionLookup[candidateTupple.position] = itemToAdd
            } else {
              normalPositionLookup[candidateTupple.position] = normalPositionLookup[candidateTupple.position]
                .concat(itemToAdd)
            }
            index = tupplesIndex
            // normalPositionLookup.push(candidateTupple)
            // index = normalPositionLookup.length - 1
            if (faceColor !== undefined) {
              colors.push(color)
            }
            normals.push(normal)
            positions.push(position)
            tupplesIndex += 1
          } else {
            index = existingTupple.index
          }
        } else {
          if (faceColor !== undefined) {
            colors.push(color)
          }
          normals.push(normal)
          positions.push(position)
          index = positions.length - 1
        }

        // let prevcolor = colors[index]
        polygonIndices.push(index)
      }

      for (let j = 2; j < polygonIndices.length; j++) {
        indices.push([polygonIndices[0], polygonIndices[j - 1], polygonIndices[j]])
      }

      // if too many vertices or we are at the end, start a new geometry
      if (positions.length > 65000 || i === polygons.length - 1) {
        // special case to deal with face color SPECICIALLY SET TO UNDEFINED
        if (faceColor === undefined) {
          geometries.push({
            indices,
            positions,
            normals,
            isTransparent
          })
        } else {
          geometries.push({
            indices,
            positions,
            normals,
            colors,
            isTransparent
          })
        }
      }
    }
    return geometries
  }

  csgs = toArray(csgs)
  const geometriesPerCsg = csgs.map(convert)

  return geometriesPerCsg
}

/** determine if input is a hex (color) or not
 * @param  {Object} object a string, array, object , whatever
 * @returns {Boolean} wether the input is a hex string or not
 */
const isHexColor = (object) => {
  if (typeof sNum !== 'string') {
    return false
  }
  return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(object)
}

// modified from https://stackoverflow.com/questions/21646738/convert-hex-to-rgba
const hexToRgbNormalized = (hex, alpha) => {
  hex = hex.replace('#', '')
  const r = parseInt(hex.length === 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16)
  const g = parseInt(hex.length === 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16)
  const b = parseInt(hex.length === 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16)
  return (alpha ? [r, g, b, alpha] : [r, g, b, 255]).map((x) => x / 255)
}

/** outputs a normalized [0...1] range, 4 component array color
 * @param  {} input
 */
const normalizedColor = (input) => {
  if (isHexColor(input)) {
    return hexToRgbNormalized(input)
  } else if (Array.isArray(input) && input.length >= 3) {
    input = input.length < 4 ? [input[0], input[1], input[2], 1] : input.slice(0, 4)
    if (input[0] > 1 || input[1] > 1 || input[2] > 1) {
      return input.map((x) => x / 255)
    }
    return input
  }
}

/**
 * return the color information of a polygon
 * @param {Object} polygon a csg.js polygon
 * @param {Object} faceColor a hex color value to default to
 * @returns {Array}  `[r, g, b, a]`
 */
const polygonColor = (polygon, faceColor) => {
  let color = faceColor

  if (polygon.shared && polygon.shared.color) {
    color = polygon.shared.color
  } else if (polygon.color) {
    color = polygon.color
  }
  // opaque is default
  if (color !== undefined && color.length < 4) {
    color.push(1.0)
  }
  return color
}

/**
 * determine if the two given normals are 'similar' ie if the distance/angle between the
 * two is less than the given threshold
 * @param {Array} normal a 3 component array normal
 * @param {Array} otherNormal another 3 component array normal
 * @returns {Boolean} true if the two normals are similar
 */
const areNormalsSimilar = (normal, otherNormal, threshold) => vec3.distance(normal, otherNormal) <= threshold
// angle computation is too slow but actually precise
// return vec3.angle(normal, otherNormal) <= threshold

const fuzyNormalAndPositionLookup = (normalPositionLookup, toCompare, normalThreshold = 0.349066) => {
  const normalsCandidates = normalPositionLookup[toCompare.position]
  if (normalsCandidates) {
    // normalPositionLookup[toCompare.position] = normalPositionLookup[toCompare.position].concat([toCompare.normal])
    // get array of normals with same position
    for (let i = 0; i < normalsCandidates.length; i++) {
      const normal = normalsCandidates[i].normal
      const similarNormal = areNormalsSimilar(normal, toCompare.normal, normalThreshold)
      const similar = similarNormal
      if (similar) {
        return { tupple: { position: toCompare.position, normal }, index: normalsCandidates[i].index }
      }
    }
  }
  return undefined
}

module.exports = csgToGeometries
