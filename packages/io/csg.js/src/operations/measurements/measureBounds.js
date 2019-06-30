const flatten = require('../../utils/flatten')

const { vec2, vec3 } = require('../../math')

const { geom2, geom3, path2, poly3 } = require('../../geometry')

/*
 * Measure the min and max bounds of the given (path2) geometry.
 * @return {[[x,y,z], [x,y,z]]} the bounds (min and max points) for the geometry
 */
const measureBoundsOfPath2 = (geometry) => {
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

  return [minpoint, maxpoint]
}

/*
 * Measure the min and max bounds of the given (geom2) geometry.
 * @return {[[x,y,z], [x,y,z]]} the bounds (min and max) for the geometry
 */
const measureBoundsOfGeom2 = (geometry) => {
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

  return [minpoint, maxpoint]
}

/**
 * Measure the min and max bounds of the given (geom3) geometry.
 * @return {[[x,y,z], [x,y,z]]} the bounds (min and max) for the geometry
 */
const measureBoundsOfGeom3 = (geometry) => {
  const polygons = geom3.toPolygons(geometry)

  let minpoint
  if (polygons.length === 0) {
    minpoint = vec3.create()
  } else {
    let points = poly3.toPoints(polygons[0])
    minpoint = vec3.clone(points[0])
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

  return [minpoint, maxpoint]
}

/**
 * Measure the min and max bounds of the given geometry(s),
 * where min and max bounds are an array of [x,y,z]
 * @param {...geometries} geometries - the geometry(s) to measure
 * @return {[min, max]|Array[[min, max]]} the bounds for each geometry
 *
 * @example
 * let bounds = measureBounds(sphere())
 */
const measureBounds = (...geometries) => {
  geometries = flatten(geometries)
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  const results = geometries.map((geometry) => {
    if (path2.isA(geometry)) return measureBoundsOfPath2(geometry)
    if (geom2.isA(geometry)) return measureBoundsOfGeom2(geometry)
    if (geom3.isA(geometry)) return measureBoundsOfGeom3(geometry)
    return [[0, 0, 0], [0, 0, 0]]
  })
  return results.length === 1 ? results[0] : results
}

module.exports = measureBounds
