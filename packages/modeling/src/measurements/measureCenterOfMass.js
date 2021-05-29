const flatten = require('../utils/flatten')

const vec3 = require('../maths/vec3')

const geom2 = require('../geometries/geom2')
const geom3 = require('../geometries/geom3')
const path2 = require('../geometries/path2')

const measureBoundingBox = require('./measureBoundingBox')

const cacheOfCenterOfMass = new WeakMap()

/*
 * Measure the center of mass for the given geometry.
 * The given geometry is infinitely thin, so there's no real mass, just a center.
 * @return {Array} the center of mass for the geometry
 */
const measureCenterOfMassGeom2 = (geometry) => {
  let centerOfMass = cacheOfCenterOfMass.get(geometry)
  if (centerOfMass !== undefined) return centerOfMass

  const bounds = measureBoundingBox(geometry)
  centerOfMass = [0, 0, 0]
  centerOfMass[0] = (bounds[0][0] + ((bounds[1][0] - bounds[0][0]) / 2))
  centerOfMass[1] = (bounds[0][1] + ((bounds[1][1] - bounds[0][1]) / 2))
  centerOfMass[2] = (bounds[0][2] + ((bounds[1][2] - bounds[0][2]) / 2))

  cacheOfCenterOfMass.set(geometry, centerOfMass)
  return centerOfMass
}

/*
 * Measure the center of mass for the given geometry.
 * @return {Array} the center of mass for the geometry
 */
const measureCenterOfMassGeom3 = (geometry) => {
  let centerOfMass = cacheOfCenterOfMass.get(geometry)
  if (centerOfMass !== undefined) return centerOfMass

  centerOfMass = vec3.create() // 0, 0, 0

  const polygons = geom3.toPolygons(geometry)
  if (polygons.length === 0) return centerOfMass

  let totalVolume = 0
  const vector = vec3.create() // for speed
  polygons.forEach((polygon) => {
    // calculate volume and center of each tetrahedon
    const vertices = polygon.vertices
    for (let i = 0; i < vertices.length - 2; i++) {
      vec3.cross(vector, vertices[i + 1], vertices[i + 2])
      const volume = vec3.dot(vertices[0], vector) / 6

      totalVolume += volume

      vec3.add(vector, vertices[0], vertices[i + 1])
      vec3.add(vector, vector, vertices[i + 2])
      const weightedCenter = vec3.scale(vector, vector, 1 / 4 * volume)

      vec3.add(centerOfMass, centerOfMass, weightedCenter)
    }
  })
  vec3.scale(centerOfMass, centerOfMass, 1 / totalVolume)

  cacheOfCenterOfMass.set(geometry, centerOfMass)
  return centerOfMass
}

/**
 * Measure the center of mass for the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the center of mass for each geometry, i.e. [X, Y, Z]
 * @alias module:modeling/measurements.measureCenterOfMass
 *
 * @example
 * let center = measureCenterOfMass(sphere())
 */
const measureCenterOfMass = (...geometries) => {
  geometries = flatten(geometries)

  const results = geometries.map((geometry) => {
    if (path2.isA(geometry)) return measureCenterOfMassGeom2(geometry)
    if (geom2.isA(geometry)) return measureCenterOfMassGeom2(geometry)
    if (geom3.isA(geometry)) return measureCenterOfMassGeom3(geometry)
    return [0, 0, 0]
  })
  return results.length === 1 ? results[0] : results
}

module.exports = measureCenterOfMass
