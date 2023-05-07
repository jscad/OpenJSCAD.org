import { flatten } from '../utils/index.js'

import * as vec2 from '../maths/vec2/index.js'
import * as vec3 from '../maths/vec3/index.js'

import * as geom2 from '../geometries/geom2/index.js'
import * as geom3 from '../geometries/geom3/index.js'
import * as path2 from '../geometries/path2/index.js'
import * as poly3 from '../geometries/poly3/index.js'

const cacheOfBoundingSpheres = new WeakMap()

/*
 * Measure the bounding sphere of the given (path2) geometry.
 * @return {[[x, y, z], radius]} the bounding sphere for the geometry
 */
const measureBoundingSphereOfPath2 = (geometry) => {
  let boundingSphere = cacheOfBoundingSpheres.get(geometry)
  if (boundingSphere !== undefined) return boundingSphere

  const centroid = vec3.create()
  let radius = 0

  const points = path2.toPoints(geometry)

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

  boundingSphere = [centroid, radius]
  cacheOfBoundingSpheres.set(geometry, boundingSphere)

  return boundingSphere
}

/*
 * Measure the bounding sphere of the given (geom2) geometry.
 * @return {[[x, y, z], radius]} the bounding sphere for the geometry
 */
const measureBoundingSphereOfGeom2 = (geometry) => {
  let boundingSphere = cacheOfBoundingSpheres.get(geometry)
  if (boundingSphere !== undefined) return boundingSphere

  const centroid = vec3.create()
  let radius = 0

  const points = geom2.toPoints(geometry)

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

  boundingSphere = [centroid, radius]
  cacheOfBoundingSpheres.set(geometry, boundingSphere)

  return boundingSphere
}

/*
 * Measure the bounding sphere of the given (geom3) geometry.
 * @return {[[x, y, z], radius]} the bounding sphere for the geometry
 */
const measureBoundingSphereOfGeom3 = (geometry) => {
  let boundingSphere = cacheOfBoundingSpheres.get(geometry)
  if (boundingSphere !== undefined) return boundingSphere

  const centroid = vec3.create()
  let radius = 0

  const polygons = geom3.toPolygons(geometry)

  if (polygons.length > 0) {
    // calculate the centroid of the geometry
    let numPoints = 0
    polygons.forEach((polygon) => {
      poly3.toVertices(polygon).forEach((point) => {
        vec3.add(centroid, centroid, point)
        numPoints++
      })
    })
    vec3.scale(centroid, centroid, 1 / numPoints)

    // find the farthest point from the centroid
    polygons.forEach((polygon) => {
      poly3.toVertices(polygon).forEach((point) => {
        radius = Math.max(radius, vec3.squaredDistance(centroid, point))
      })
    })
    radius = Math.sqrt(radius)
  }

  boundingSphere = [centroid, radius]
  cacheOfBoundingSpheres.set(geometry, boundingSphere)

  return boundingSphere
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
    if (path2.isA(geometry)) return measureBoundingSphereOfPath2(geometry)
    if (geom2.isA(geometry)) return measureBoundingSphereOfGeom2(geometry)
    if (geom3.isA(geometry)) return measureBoundingSphereOfGeom3(geometry)
    return [[0, 0, 0], 0]
  })
  return results.length === 1 ? results[0] : results
}
