import { flatten } from '../utils/flatten.js'

import * as vec2 from '../maths/vec2/index.js'
import * as vec3 from '../maths/vec3/index.js'

import * as geom2 from '../geometries/geom2/index.js'
import * as geom3 from '../geometries/geom3/index.js'
import * as path2 from '../geometries/path2/index.js'
import * as poly3 from '../geometries/poly3/index.js'
import * as slice from '../geometries/slice/index.js'

const cache = new WeakMap()

/*
 * Expand bounding box with a 2D point.
 */
const expand2 = (bbox, point) => {
  if (bbox.length === 0) {
    bbox[0] = vec3.fromVec2(vec3.create(), point)
    bbox[1] = vec3.fromVec2(vec3.create(), point)
  } else {
    vec2.min(bbox[0], bbox[0], point)
    vec2.max(bbox[1], bbox[1], point)
  }
}

/*
 * Expand bounding box with a 3D vertex.
 */
const expand3 = (bbox, vertex) => {
  if (bbox.length === 0) {
    bbox[0] = vec3.clone(vertex)
    bbox[1] = vec3.clone(vertex)
  } else {
    vec3.min(bbox[0], bbox[0], vertex)
    vec3.max(bbox[1], bbox[1], vertex)
  }
}

/*
 * Measure a geometry using a given measure function.
 * Uses cached if available. Otherwise, compute bounding box and save to cache.
 *
 * @param {Geometry} geometry - the geometry to measure
 * @param {Function} measureFn - the function to measure the bounding box
 * @return {Array[]} the min and max bounds for the geometry
 */
const measureCached = (geometry, measureFn) => {
  let boundingBox = cache.get(geometry)
  if (boundingBox) return boundingBox
  boundingBox = measureFn(geometry)
  // if bounding box is undefined, default to [0,0,0] and [0,0,0]
  if (boundingBox.length === 0) {
    boundingBox[0] = vec3.create()
    boundingBox[1] = vec3.create()
  }
  cache.set(geometry, boundingBox)
  return boundingBox
}

/*
 * Measure the min and max bounds of the given (path2) geometry.
 * @return {Array[]} the min and max bounds for the geometry
 */
const measureBoundingBoxOfPath2 = (geometry) => {
  const boundingBox = []
  path2.toPoints(geometry).forEach((point) => {
    expand2(boundingBox, point)
  })
  return boundingBox
}

/*
 * Measure the min and max bounds of the given (geom2) geometry.
 * @return {Array[]} the min and max bounds for the geometry
 */
const measureBoundingBoxOfGeom2 = (geometry) => {
  const boundingBox = []
  geom2.toPoints(geometry).forEach((point) => {
    expand2(boundingBox, point)
  })
  return boundingBox
}

/*
 * Measure the min and max bounds of the given (geom3) geometry.
 * @return {Array[]} the min and max bounds for the geometry
 */
const measureBoundingBoxOfGeom3 = (geometry) => {
  const boundingBox = []
  geom3.toPolygons(geometry).forEach((polygon) => {
    poly3.toVertices(polygon).forEach((vertex) => {
      expand3(boundingBox, vertex)
    })
  })
  return boundingBox
}

/*
 * Measure the min and max bounds of the given (slice) geometry.
 * @return {Array[]} the min and max bounds for the geometry
 */
const measureBoundingBoxOfSlice = (geometry) => {
  const boundingBox = []
  geometry.contours.forEach((contour) => {
    contour.forEach((vertex) => {
      expand3(boundingBox, vertex)
    })
  })
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

  const results = geometries.map((geometry) => {
    if (path2.isA(geometry)) return measureCached(geometry, measureBoundingBoxOfPath2)
    if (geom2.isA(geometry)) return measureCached(geometry, measureBoundingBoxOfGeom2)
    if (geom3.isA(geometry)) return measureCached(geometry, measureBoundingBoxOfGeom3)
    if (slice.isA(geometry)) return measureCached(geometry, measureBoundingBoxOfSlice)
    return [[0, 0, 0], [0, 0, 0]]
  })
  return results.length === 1 ? results[0] : results
}
