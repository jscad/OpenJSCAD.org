const flatten = require('../utils/flatten')

const vec2 = require('../maths/vec2')
const vec3 = require('../maths/vec3')

const geom2 = require('../geometries/geom2')
const geom3 = require('../geometries/geom3')
const path2 = require('../geometries/path2')
const poly3 = require('../geometries/poly3')

/*
 * Measure the min and max bounds of the given (path2) geometry.
 * @return {Array[]} the min and max bounds for the geometry
 */
const measureBoundingBoxOfPath2 = (geometry) => {
  if (geometry.boundingBox) return geometry.boundingBox

  const points = path2.toPoints(geometry)

  let minpoint
  if (points.length === 0) {
    minpoint = vec2.create()
  } else {
    minpoint = vec2.clone(points[0])
  }
  let maxpoint = vec2.clone(minpoint)

  points.forEach((point) => {
    vec2.min(minpoint, minpoint, point)
    vec2.max(maxpoint, maxpoint, point)
  })
  minpoint = [minpoint[0], minpoint[1], 0]
  maxpoint = [maxpoint[0], maxpoint[1], 0]

  geometry.boundingBox = [minpoint, maxpoint]
  return geometry.boundingBox
}

/*
 * Measure the min and max bounds of the given (geom2) geometry.
 * @return {Array[]} the min and max bounds for the geometry
 */
const measureBoundingBoxOfGeom2 = (geometry) => {
  if (geometry.boundingBox) return geometry.boundingBox

  const points = geom2.toPoints(geometry)

  let minpoint
  if (points.length === 0) {
    minpoint = vec2.create()
  } else {
    minpoint = vec2.clone(points[0])
  }
  let maxpoint = vec2.clone(minpoint)

  points.forEach((point) => {
    vec2.min(minpoint, minpoint, point)
    vec2.max(maxpoint, maxpoint, point)
  })

  minpoint = [minpoint[0], minpoint[1], 0]
  maxpoint = [maxpoint[0], maxpoint[1], 0]

  geometry.boundingBox = [minpoint, maxpoint]
  return geometry.boundingBox
}

/*
 * Measure the min and max bounds of the given (geom3) geometry.
 * @return {Array[]} the min and max bounds for the geometry
 */
const measureBoundingBoxOfGeom3 = (geometry) => {
  if (geometry.boundingBox) return geometry.boundingBox

  const polygons = geom3.toPolygons(geometry)

  let minpoint = vec3.create()
  if (polygons.length > 0) {
    const points = poly3.toPoints(polygons[0])
    vec3.copy(minpoint, points[0])
  }
  let maxpoint = vec3.clone(minpoint)

  polygons.forEach((polygon) => {
    poly3.toPoints(polygon).forEach((point) => {
      vec3.min(minpoint, minpoint, point)
      vec3.max(maxpoint, maxpoint, point)
    })
  })

  minpoint = [minpoint[0], minpoint[1], minpoint[2]]
  maxpoint = [maxpoint[0], maxpoint[1], maxpoint[2]]

  geometry.boundingBox = [minpoint, maxpoint]
  return geometry.boundingBox
}

/**
 * Measure the min and max bounds of the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the min and max bounds for each geometry, i.e. [[X,Y,Z],[X,Y,Z]]
 * @alias module:modeling/measurements.measureBoundingBox
 *
 * @example
 * let bounds = measureBoundingBox(sphere())
 */
const measureBoundingBox = (...geometries) => {
  geometries = flatten(geometries)
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  const results = geometries.map((geometry) => {
    if (path2.isA(geometry)) return measureBoundingBoxOfPath2(geometry)
    if (geom2.isA(geometry)) return measureBoundingBoxOfGeom2(geometry)
    if (geom3.isA(geometry)) return measureBoundingBoxOfGeom3(geometry)
    return [[0, 0, 0], [0, 0, 0]]
  })
  return results.length === 1 ? results[0] : results
}

module.exports = measureBoundingBox
