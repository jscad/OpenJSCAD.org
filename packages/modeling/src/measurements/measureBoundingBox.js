import { flatten } from '../utils/flatten.js'

import * as vec2 from '../maths/vec2/index.js'
import * as vec3 from '../maths/vec3/index.js'

import * as geom2 from '../geometries/geom2/index.js'
import * as geom3 from '../geometries/geom3/index.js'
import * as path2 from '../geometries/path2/index.js'
import * as poly3 from '../geometries/poly3/index.js'

const cache = new WeakMap()

/*
 * Measure the min and max bounds of the given (path2) geometry.
 * @return {Array[]} the min and max bounds for the geometry
 */
const measureBoundingBoxOfPath2 = (geometry) => {
  let boundingBox = cache.get(geometry)
  if (boundingBox) return boundingBox

  const points = path2.toPoints(geometry)

  let minPoint
  if (points.length === 0) {
    minPoint = vec2.create()
  } else {
    minPoint = vec2.clone(points[0])
  }
  let maxPoint = vec2.clone(minPoint)

  points.forEach((point) => {
    vec2.min(minPoint, minPoint, point)
    vec2.max(maxPoint, maxPoint, point)
  })
  minPoint = [minPoint[0], minPoint[1], 0]
  maxPoint = [maxPoint[0], maxPoint[1], 0]

  boundingBox = [minPoint, maxPoint]

  cache.set(geometry, boundingBox)

  return boundingBox
}

/*
 * Measure the min and max bounds of the given (geom2) geometry.
 * @return {Array[]} the min and max bounds for the geometry
 */
const measureBoundingBoxOfGeom2 = (geometry) => {
  let boundingBox = cache.get(geometry)
  if (boundingBox) return boundingBox

  const points = geom2.toPoints(geometry)

  let minPoint
  if (points.length === 0) {
    minPoint = vec2.create()
  } else {
    minPoint = vec2.clone(points[0])
  }
  let maxPoint = vec2.clone(minPoint)

  points.forEach((point) => {
    vec2.min(minPoint, minPoint, point)
    vec2.max(maxPoint, maxPoint, point)
  })

  minPoint = [minPoint[0], minPoint[1], 0]
  maxPoint = [maxPoint[0], maxPoint[1], 0]

  boundingBox = [minPoint, maxPoint]

  cache.set(geometry, boundingBox)

  return boundingBox
}

/*
 * Measure the min and max bounds of the given (geom3) geometry.
 * @return {Array[]} the min and max bounds for the geometry
 */
const measureBoundingBoxOfGeom3 = (geometry) => {
  let boundingBox = cache.get(geometry)
  if (boundingBox) return boundingBox

  const polygons = geom3.toPolygons(geometry)

  let minVertex = vec3.create()
  if (polygons.length > 0) {
    const vertices = poly3.toVertices(polygons[0])
    vec3.copy(minVertex, vertices[0])
  }
  let maxVertex = vec3.clone(minVertex)

  polygons.forEach((polygon) => {
    poly3.toVertices(polygon).forEach((vertex) => {
      vec3.min(minVertex, minVertex, vertex)
      vec3.max(maxVertex, maxVertex, vertex)
    })
  })

  minVertex = [minVertex[0], minVertex[1], minVertex[2]]
  maxVertex = [maxVertex[0], maxVertex[1], maxVertex[2]]

  boundingBox = [minVertex, maxVertex]

  cache.set(geometry, boundingBox)

  return boundingBox
}

/**
 * Measure the min and max bounds of the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the min and max bounds, or a list of bounds for each geometry
 * @alias module:modeling/measurements.measureBoundingBox
 *
 * @example
 * let bounds = measureBoundingBox(sphere())
 */
export const measureBoundingBox = (...geometries) => {
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
