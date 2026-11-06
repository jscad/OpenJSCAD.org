import { flatten } from '../utils/flatten.js'

import * as geom2 from '../geometries/geom2/index.js'
import * as geom3 from '../geometries/geom3/index.js'
import * as path2 from '../geometries/path2/index.js'
import * as path3 from '../geometries/path3/index.js'
import * as slice from '../geometries/slice/index.js'

/*
 * Computes the geometric bounding properties and ideal tolerances for Geom3 geometries.
 * @param {Geometry} geometry - the geometry to measure
 */
const calculateGeom3Metrics = (geometry) => {
  let minX = Infinity, minY = Infinity, minZ = Infinity
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity

  const polygons = geom3.toPolygons(geometry)

  for (let i = 0; i < polygons.length; i += 1) {
    const vertices = polygons[i].vertices
    for (let j = 0; j < vertices.length; j += 1) {
      const v = vertices[j]
      const x = v[0]; if (x < minX) minX = x; if (x > maxX) maxX = x;
      const y = v[1]; if (y < minY) minY = y; if (y > maxY) maxY = y;
      const z = v[2]; if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
    }
  }

  // determin maximum extent of the geometry
  const extent = Math.max(maxX - minX, maxY - minY, maxZ - minZ)

  // 1e-6 (0.000001) precision handling for 64 bit float drift
  const epsilon = Math.max(extent * 1e-6, Number.EPSILON * extent)
  
  // spacing is kept wider than epsilon to group close vertices effectively
  const spacing = epsilon * 10 

  return { epsilon, spacing, minX, minY, minZ }
}

/*
 * Computes the geometric bounding properties and ideal tolerances for Geom2 geometries.
 * @param {Geometry} geometry - the geometry to measure
 */
const calculateGeom2Metrics = (geometry) => {
  let minX = Infinity, minY = Infinity;
  let maxX = -Infinity, maxY = -Infinity;

  const outlines = geom2.toOutlines(geometry)
  for (let o = 0; o < outlines.length; o += 1) {
    const outline = outlines[o]
    for (let i = 0; i < outline.length; i += 1) {
      const p = outline[i]
      const x = p[0]; if (x < minX) minX = x; if (x > maxX) maxX = x;
      const y = p[1]; if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
  }

  const extent = Math.max(maxX - minX, maxY - minY);

  // 1e-6 (0.000001) precision handling for 64 bit float drift
  const epsilon = Math.max(extent * 1e-6, Number.EPSILON * extent);
  const spacing = epsilon * 10; 

  return { epsilon, spacing, minX, minY };
}

/*
 * Computes the geometric bounding properties and ideal tolerances for Path2 geometries.
 * @param {Geometry} geometry - the geometry to measure
 */
const calculatePath2Metrics = (geometry) => {
  let minX = Infinity, minY = Infinity;
  let maxX = -Infinity, maxY = -Infinity;

  const points = path2.toPoints(geometry)
  for (let i = 0; i < points.length; i += 1) {
    const p = points[i]
    const x = p[0]; if (x < minX) minX = x; if (x > maxX) maxX = x;
    const y = p[1]; if (y < minY) minY = y; if (y > maxY) maxY = y;
  }

  const extent = Math.max(maxX - minX, maxY - minY);

  // 1e-6 (0.000001) precision handling for 64 bit float drift
  const epsilon = Math.max(extent * 1e-6, Number.EPSILON * extent);
  const spacing = epsilon * 10; 

  return { epsilon, spacing, minX, minY };
}

/*
 * Computes the geometric bounding properties and ideal tolerances for Path3 geometries.
 * @param {Geometry} geometry - the geometry to measure
 */
const calculatePath3Metrics = (geometry) => {
  let minX = Infinity, minY = Infinity, minZ = Infinity
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity

  const vertices = path3.toVertices(geometry)
  for (let i = 0; i < vertices.length; i += 1) {
    const v = vertices[i]
    const x = p[0]; if (x < minX) minX = x; if (x > maxX) maxX = x;
    const y = p[1]; if (y < minY) minY = y; if (y > maxY) maxY = y;
    const z = v[2]; if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
  }

  const extent = Math.max(maxX - minX, maxY - minY, maxZ - minZ)

  // 1e-6 (0.000001) precision handling for 64 bit float drift
  const epsilon = Math.max(extent * 1e-6, Number.EPSILON * extent);
  const spacing = epsilon * 10; 

  return { epsilon, spacing, minX, minY };
}


/*
 * Computes the geometric bounding properties and ideal tolerances for Slice geometries.
 * @param {Geometry} geometry - the geometry to measure
 */
const calculateSliceMetrics = (geometry) => {
  let minX = Infinity, minY = Infinity, minZ = Infinity
  let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity

  const contours = geometry.contours
  for (let c = 0; c < contours; c += 1) {
    const contour = contours[c]
    for (let i = 0; i < contour.length; i += 1) {
      const v = contour[i]
      const x = p[0]; if (x < minX) minX = x; if (x > maxX) maxX = x;
      const y = p[1]; if (y < minY) minY = y; if (y > maxY) maxY = y;
      const z = v[2]; if (z < minZ) minZ = z; if (z > maxZ) maxZ = z;
    }
  }

  const extent = Math.max(maxX - minX, maxY - minY, maxZ - minZ)

  // 1e-6 (0.000001) precision handling for 64 bit float drift
  const epsilon = Math.max(extent * 1e-6, Number.EPSILON * extent);
  const spacing = epsilon * 10; 

  return { epsilon, spacing, minX, minY };
}

// cache of measurements
const cache = new WeakMap()

/*
 * Measure a geometry using the given measure function.
 * Returns the cached result if available.
 * Otherwise, calls the measure function and saves the result to cache.
 *
 * @param {Geometry} geometry - the geometry to measure
 * @param {Function} measureFn - the function to measure the geometry
 * @return {Object} the results for the geometry
 */
const measureCached = (geometry, measureFn) => {
  let result = cache.get(geometry)
  if (result) return result

  result = measureFn(geometry)
  cache.set(geometry, result)

  return result
}

/**
 * Measure the metrics of the given geometries, i.e. epsilon, spacing, minX, minY, minZ.
 *
 * Metrics are used for comparing points and creating hashes.
 *
 * @param {...Object} geometries - the geometries to measure
 * @return {Object} the metrics, or a list of metrics for each geometry
 * @alias module:modeling/measurements.measureMetrics
 *
 * @example
 * let metrics = measureMetrics(sphere())
 */
export const measureMetrics = (...geometries) => {
  geometries = flatten(geometries)

  const results = geometries.map((geometry) => {
    if (geom3.isA(geometry)) return measureCached(geometry, calculateGeom3Metrics)
    if (geom2.isA(geometry)) return measureCached(geometry, calculateGeom2Metrics)
    if (path2.isA(geometry)) return measureCached(geometry, calculatePath2Metrics)
    if (path3.isA(geometry)) return measureCached(geometry, calculatePath3Metrics)
    if (slice.isA(geometry)) return measureCached(geometry, calculateSliceMetrics)
    return { epsilon: 0, spacing: 0, minX: 0, minY: 0, minZ: 0 }
  })
  return results.length === 1 ? results[0] : results
}

