const vec3 = require('gl-vec3')
const mat4 = require('gl-mat4')

/*
 * Convert the given solid into one or more geometries for rendering.
 * @param {Object} options - options for conversion
 * @param {Array} options.color - RGBA of solid
 * @param {Float} options.normalThreshold - threshold beyond which to split normals
 * @param {Boolean} options.smoothLighting - set to true in order to use interpolated vertex normals
 * this creates nice round spheres but does not represent the shape of the actual model
 * @param {geom3} solid - the solid to convert
 * @return {Array} list of new geometries
 */
const geom3ToGeometries = (options, solid) => {
  const { smoothLighting, normalThreshold, color } = options

  return convert({ color, smoothLighting, normalThreshold }, solid)
}

/*
 * Convert the given geometry using the given options (see above for options)
 * @returns {Object} [{indices, positions, normals, colors}, ...]
 */
const convert = (options, geometry) => {
  let { color, smoothLighting, normalThreshold } = options

  const geometries = []

  const positions = []
  const colors = []
  const normals = []
  const indices = []

  if ('color' in geometry) color = geometry.color

  // flag for transparency
  let isTransparent = false

  const polygons = geometry.polygons
  const transforms = geometry.transforms ? geometry.transforms : mat4.create()

  let normalPositionLookup = []
  normalPositionLookup = {}
  let tupplesIndex = 0

  // FIXME this isn't going to work if the polygons are > 65000 (see below)

  for (let i = 0; i < polygons.length; i++) {
    const polygon = polygons[i]

    const faceColor = polygonColor(polygon, color)
    const normal = calculateNormal(polygon.vertices)

    if (faceColor && faceColor[3] !== 1) {
      isTransparent = true
    }

    const polygonIndices = []
    // we need unique tupples of normal + position , that gives us a specific index (indices)
    // if the angle between a given normal and another normal is less than X they are considered the same
    for (let j = 0; j < polygon.vertices.length; j++) {
      let index

      const vertex = polygon.vertices[j]
      const position = [vertex[0], vertex[1], vertex[2]]

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
          if (faceColor) {
            colors.push(faceColor)
          }
          normals.push(normal)
          positions.push(position)
          tupplesIndex += 1
        } else {
          index = existingTupple.index
        }
      } else {
        if (faceColor) {
          colors.push(faceColor)
        }
        normals.push(normal)
        positions.push(position)
        index = positions.length - 1
      }

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
          transforms,
          normals,
          color,
          isTransparent
        })
      } else {
        geometries.push({
          indices,
          positions,
          transforms,
          normals,
          colors,
          isTransparent
        })
      }
    }
  }
  return geometries
}

/**
 * return the color information of a polygon
 * @param {Object} polygon a polygon
 * @param {Object} color a default color
 * @returns {Array}  `[r, g, b, a]`
 */
const polygonColor = (polygon, color) => {
  let faceColor = color

  if (polygon.color) {
    faceColor = polygon.color
  }
  // opaque is default
  if (faceColor && faceColor.length < 4) {
    faceColor.push(1.0)
  }
  return faceColor
}

/**
 * determine if the two given normals are 'similar' ie if the distance/angle between the
 * two is less than the given threshold
 * @param {Array} normal a 3 component array normal
 * @param {Array} otherNormal another 3 component array normal
 * @returns {Boolean} true if the two normals are similar
 */
const calculateNormal = (vertices) => {
  const ba = vec3.create()
  vec3.subtract(ba, vertices[1], vertices[0])
  const ca = vec3.create()
  vec3.subtract(ca, vertices[2], vertices[0])
  const normal = vec3.create()
  vec3.cross(normal, ba, ca)
  vec3.normalize(normal, normal)
  return normal
}

const areNormalsSimilar = (normal, otherNormal, threshold) => (vec3.distance(normal, otherNormal) <= threshold)

const fuzyNormalAndPositionLookup = (normalPositionLookup, toCompare, normalThreshold) => {
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

module.exports = geom3ToGeometries
