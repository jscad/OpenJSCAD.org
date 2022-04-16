const vec3 = require('gl-vec3')
const mat4 = require('gl-mat4')

const maxIndex = 65535

/*
 * Convert the given solid into one or more geometries for rendering.
 * @param {Object} options - options for conversion
 * @param {Array} options.color - RGBA of solid
 * @param {Boolean} options.smoothLighting - set to true in order to use interpolated vertex normals
 * this creates nice round spheres but does not represent the shape of the actual model
 * @param {geom3} solid - the solid to convert
 * @return {Array} list of new geometries
 */
const geom3ToGeometries = (options, solid) => {
  let { color, smoothLighting } = options

  if ('color' in solid) color = solid.color

  const polygons = solid.polygons
  const transforms = solid.transforms ? mat4.clone(solid.transforms) : mat4.create()

  const geometries = []

  let setstart = 0
  while (setstart < polygons.length) {
    // calculate end of this set
    let vcount = 0
    let setend = setstart
    for (let i = setstart; i < polygons.length; i++) {
      vcount += polygons[i].vertices.length
      if (vcount > maxIndex) break
      setend++
    }
    // temporary storage
    // create attributes of geometry
    const positions = []
    const normals = []
    const indices = []
    const colors = []
    const isTransparent = true

    for (let i = setstart; i < setend; i++) {
      const polygon = polygons[i]
      const vertices = polygon.vertices

      const normal = calculateNormal(polygon)
      const faceColor = polygonColor(polygon, color)

      const polygonIndices = []
      for (let j = 0; j < vertices.length; j++) {
        const position = vertices[j]

        positions.push(position)
        normals.push(normal)
        colors.push(faceColor)

        const index = positions.length - 1
        polygonIndices.push(index)
      }
      // add indices to list
      for (let j = 2; j < polygonIndices.length; j++) {
        indices.push([polygonIndices[0], polygonIndices[j - 1], polygonIndices[j]])
      }
    }
    // FIXME positions should be Float32Array buffers to eliminate another conversion
    // FIXME normals should be Float32Array buffers to eliminate another conversion
    // FIXME indices should be Uint16Array buffers to eliminate another conversion
    // FIXME colors should be Float32Array buffers to eliminate another conversion
    // assemble the geometry
    const geometry = {
      type: '3d',
      positions,
      normals,
      indices,
      colors,
      transforms,
      isTransparent
    }
    geometries.push(geometry)

    // continue on
    setstart = setend
  }
  return geometries
}

/*
 * TODO
 * TODO Implement smoothing
 * TODO
 */
const smoothing = () => {
  const polygons = []
  const color = []
  let isTransparent = true
  const smoothLighting = true
  const normalThreshold = 0.5 // threshold beyond which to split normals
  const positions = []
  const normals = []
  const indices = []
  const colors = []
  const normalPositionLookup = []
  let tupplesIndex = 0
  for (let i = 0; i < polygons.length; i++) {
    const polygon = polygons[i]
    const vertices = polygon.vertices
    const faceColor = polygonColor(polygon, color)
    const normal = calculateNormal(polygon)
    if (faceColor && faceColor[3] !== 1) isTransparent = true
    const polygonIndices = []
    // we need unique tupples of normal + position, that gives us a specific index (indices)
    // if the angle between a given normal and another normal is less than X they are considered the same
    for (let j = 0; j < vertices.length; j++) {
      let index
      const position = vertices[j]
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
  }
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

/*
 * Calculate the normal of the given polygon
 */
const calculateNormal = (polygon) => {
  if (polygon.plane) return vec3.clone(polygon.plane)

  const vertices = polygon.vertices
  const ba = vec3.create()
  vec3.subtract(ba, vertices[1], vertices[0])
  const ca = vec3.create()
  vec3.subtract(ca, vertices[2], vertices[0])
  const normal = vec3.create()
  vec3.cross(normal, ba, ca)
  vec3.normalize(normal, normal)
  return normal
}

/*
 * determine if the two given normals are 'similar' ie if the distance/angle between the
 * two is less than the given threshold
 * @param {Array} normal a 3 component array normal
 * @param {Array} otherNormal another 3 component array normal
 * @returns {Boolean} true if the two normals are similar
 */
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
