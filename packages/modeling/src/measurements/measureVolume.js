import { flatten } from '../utils/flatten.js'

import * as geom3 from '../geometries/geom3/index.js'
import * as poly3 from '../geometries/poly3/index.js'

const cache = new WeakMap()

/*
 * Measure the volume of the given geometry.
 *
 * @param {Geom3} geometry - 3D geometry to measure
 * @returns {number} volume of the geometry
 */
const measureVolumeOfGeom3 = (geometry) => {
  let volume = cache.get(geometry)
  if (volume) return volume

  const polygons = geom3.toPolygons(geometry)
  volume = polygons.reduce((volume, polygon) => volume + poly3.measureSignedVolume(polygon), 0)

  cache.set(geometry, volume)

  return volume
}

/**
 * Measure the volume of the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {number|Array} the volume, or a list of volumes for each geometry
 * @alias module:modeling/measurements.measureVolume
 *
 * @example
 * let volume = measureVolume(sphere())
 */
export const measureVolume = (...geometries) => {
  geometries = flatten(geometries)
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  const results = geometries.map((geometry) => {
    if (geom3.isA(geometry)) return measureVolumeOfGeom3(geometry)
    // 2D geometry, paths, and slices are infinitely thin and do not have a volume
    return 0
  })
  return results.length === 1 ? results[0] : results
}
