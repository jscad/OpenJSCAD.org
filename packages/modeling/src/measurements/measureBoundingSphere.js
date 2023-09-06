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
 * Measure a geometry using a given measure function.
 * Uses cached if available. Otherwise, compute bounding sphere and save to cache.
 *
 * @param {Geometry} geometry - the geometry to measure
 * @param {Function} measureFn - the function to measure the bounding sphere
 * @return {Array[]} the min and max bounds for the geometry
 */
const measureCached = (geometry, measureFn) => {
  let boundingSphere = cache.get(geometry)
  if (boundingSphere) return boundingSphere
  boundingSphere = measureFn(geometry)
  // if bounding sphere is undefined, default to [0,0,0] and 0
  if (boundingSphere.length === 0) {
    boundingSphere[0] = vec3.create()
    boundingSphere[1] = 0
  }
  cache.set(geometry, boundingSphere)
  return boundingSphere
}

/*
 * Measure the bounding sphere of the given 2D points.
 * @return {[[x, y, z], radius]} the bounding sphere for the points
 */
const measureBoundingSphereOfPoints = (points) => {
  const centroid = vec3.create()
  let radius = 0

  if (points.length > 0) {
    // calculate the centroid of the geometry
    let numPoints = 0
    const temp = vec3.create()
    points.forEach((point) => {
      vec3.add(centroid, centroid, vec3.fromVec2(temp, point, 0))
      numPoints++
    })
    vec3.scale(centroid, centroid, 1 / numPoints)

    // find the farthest point from the centroid
    points.forEach((point) => {
      radius = Math.max(radius, vec2.squaredDistance(centroid, point))
    })
    radius = Math.sqrt(radius)
  }

  return [centroid, radius]
}

/*
 * Measure the bounding sphere of the given (path2) geometry.
 * @return {[[x, y, z], radius]} the bounding sphere for the geometry
 */
const measureBoundingSphereOfPath2 = (points) => {
  return measureBoundingSphereOfPoints(path2.toPoints(points))
}

/*
 * Measure the bounding sphere of the given (geom2) geometry.
 * @return {[[x, y, z], radius]} the bounding sphere for the geometry
 */
const measureBoundingSphereOfGeom2 = (geometry) => {
  return measureBoundingSphereOfPoints(geom2.toPoints(geometry))
}

/*
 * Measure the bounding sphere of the given (geom3) geometry.
 * @return {[[x, y, z], radius]} the bounding sphere for the geometry
 */
const measureBoundingSphereOfGeom3 = (geometry) => {
  const centroid = vec3.create()
  let radius = 0

  const polygons = geom3.toPolygons(geometry)

  if (polygons.length > 0) {
    // calculate the centroid of the geometry
    let numVertices = 0
    polygons.forEach((polygon) => {
      poly3.toVertices(polygon).forEach((vertex) => {
        vec3.add(centroid, centroid, vertex)
        numVertices++
      })
    })
    vec3.scale(centroid, centroid, 1 / numVertices)

    // find the farthest vertex from the centroid
    polygons.forEach((polygon) => {
      poly3.toVertices(polygon).forEach((vertex) => {
        radius = Math.max(radius, vec3.squaredDistance(centroid, vertex))
      })
    })
    radius = Math.sqrt(radius)
  }

  return [centroid, radius]
}

/*
 * Measure the bounding sphere of the given (geom3) geometry.
 * @return {[[x, y, z], radius]} the bounding sphere for the geometry
 */
const measureBoundingSphereOfSlice = (geometry) => {
  const centroid = vec3.create()
  let radius = 0
  let numVertices = 0

  // calculate the centroid of the geometry
  geometry.contours.forEach((contour) => {
    contour.forEach((vertex) => {
      vec3.add(centroid, centroid, vertex)
      numVertices++
    })
  })

  if (numVertices > 0) {
    vec3.scale(centroid, centroid, 1 / numVertices)

    // find the farthest vertex from the centroid
    geometry.contours.forEach((contour) => {
      contour.forEach((vertex) => {
        radius = Math.max(radius, vec3.squaredDistance(centroid, vertex))
      })
    })
    radius = Math.sqrt(radius)
  }

  return [centroid, radius]
}

/**
 * Measure the (approximate) bounding sphere of the given geometries.
 * @see https://en.wikipedia.org/wiki/Bounding_sphere
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the bounding sphere for each geometry, i.e. [centroid, radius]
 * @alias module:modeling/measurements.measureBoundingSphere
 *
 * @example
 * let bounds = measureBoundingSphere(cube())
 */
export const measureBoundingSphere = (...geometries) => {
  geometries = flatten(geometries)

  const results = geometries.map((geometry) => {
    if (path2.isA(geometry)) return measureCached(geometry, measureBoundingSphereOfPath2)
    if (geom2.isA(geometry)) return measureCached(geometry, measureBoundingSphereOfGeom2)
    if (geom3.isA(geometry)) return measureCached(geometry, measureBoundingSphereOfGeom3)
    if (slice.isA(geometry)) return measureCached(geometry, measureBoundingSphereOfSlice)
    return [[0, 0, 0], 0]
  })
  return results.length === 1 ? results[0] : results
}
