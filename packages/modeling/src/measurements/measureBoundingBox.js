const flatten = require('../utils/flatten')

const vec2 = require('../maths/vec2')
const vec3 = require('../maths/vec3')
const mat4 = require('../maths/mat4')

const geom2 = require('../geometries/geom2')
const geom3 = require('../geometries/geom3')
const path2 = require('../geometries/path2')
const poly3 = require('../geometries/poly3')

const cache = new WeakMap()

/*
 * Measure the min and max bounds of the given (path2) geometry.points.
 * @return {Array[]} the min and max bounds for the geometry.points
 */
const measureBoundingBoxOfPath2Points = (points) => {
  let boundingBox = cache.get(points)
  if (boundingBox) return boundingBox

  let minpoint
  if (points.length === 0) {
    minpoint = vec2.create()
  } else {
    minpoint = vec2.clone(points[0])
  }
  const maxpoint = vec2.clone(minpoint)

  points.forEach((point) => {
    vec2.min(minpoint, minpoint, point)
    vec2.max(maxpoint, maxpoint, point)
  })
  boundingBox = [[minpoint[0], minpoint[1], 0], [maxpoint[0], maxpoint[1], 0]]

  cache.set(points, boundingBox)
  return boundingBox
}

/*
 * Measure the min and max bounds of the given (path2) geometry.
 * @return {Array[]} the min and max bounds for the geometry
 */
const measureBoundingBoxOfPath2 = (geometry) => {
  let boundingBox = cache.get(geometry)
  if (boundingBox) return boundingBox

  if (mat4.isOnlyTransformScale(geometry.transforms)) {
    // get boundingBox of original points and transform it
    boundingBox = transformBoundingBox(measureBoundingBoxOfPath2Points(geometry.points), geometry.transforms)
  } else {
    // transform the points and then caclulate the boundingBox
    boundingBox = measureBoundingBoxOfPath2Points(path2.toPoints(geometry))
  }

  cache.set(geometry, boundingBox)
  return boundingBox
}

/*
 * Measure the min and max bounds of the given (geom2) geometry.points/sides.
 * @return {Array[]} the min and max bounds for the geometr.points/sidesy
 */
const measureBoundingBoxOfGeom2Points = ({ points, sides }) => {
  const cacheKey = points || sides

  let boundingBox = cache.get(cacheKey)
  if (boundingBox) return boundingBox

  let minpoint, maxpoint

  if (points) {
    if (points.length === 0) {
      minpoint = vec2.create()
    } else {
      minpoint = vec2.clone(points[0])
    }
    maxpoint = vec2.clone(minpoint)

    points.forEach((point) => {
      vec2.min(minpoint, minpoint, point)
      vec2.max(maxpoint, maxpoint, point)
    })
  } else { // sides
    // to avoid calling costly toPoints, we take advantage of the knowlege how the toPoints works
    if (sides.length === 0) {
      minpoint = vec2.create()
    } else {
      minpoint = vec2.clone(sides[0][0])
    }
    maxpoint = vec2.clone(minpoint)

    sides.forEach((side) => {
      vec2.min(minpoint, minpoint, side[0])
      vec2.max(maxpoint, maxpoint, side[0])
    })
  }
  boundingBox = [[minpoint[0], minpoint[1], 0], [maxpoint[0], maxpoint[1], 0]]

  cache.set(cacheKey, boundingBox)
  return boundingBox
}

/*
 * Measure the min and max bounds of the given (geom2) geometry.
 * @return {Array[]} the min and max bounds for the geometry
 */
const measureBoundingBoxOfGeom2 = (geometry) => {
  let boundingBox = cache.get(geometry)
  if (boundingBox) return boundingBox

  if (mat4.isOnlyTransformScale(geometry.transforms)) {
    // get boundingBox of original points and transform it
    boundingBox = transformBoundingBox(measureBoundingBoxOfGeom2Points(geometry), geometry.transforms)
  } else {
    // transform the points and then caclulate the boundingBox
    boundingBox = measureBoundingBoxOfGeom2Points({ points: geom2.toPoints(geometry) })
  }

  cache.set(geometry, boundingBox)
  return boundingBox
}

/*
 * Measure the min and max bounds of the given (geom3) geometry.polygons.
 * @return {Array[]} the min and max bounds for the geometry.polygons
 */
const measureBoundingBoxOfGeom3Polygons = (polygons) => {
  let boundingBox = cache.get(polygons)
  if (boundingBox) return boundingBox

  const minpoint = vec3.create()
  if (polygons.length > 0) {
    const points = poly3.toPoints(polygons[0])
    vec3.copy(minpoint, points[0])
  }
  const maxpoint = vec3.clone(minpoint)

  polygons.forEach((polygon) => {
    poly3.toPoints(polygon).forEach((point) => {
      vec3.min(minpoint, minpoint, point)
      vec3.max(maxpoint, maxpoint, point)
    })
  })

  boundingBox = [[minpoint[0], minpoint[1], minpoint[2]], [maxpoint[0], maxpoint[1], maxpoint[2]]]

  cache.set(polygons, boundingBox)
  return boundingBox
}

/*
 * Measure the min and max bounds of the given (geom3) geometry.
 * @return {Array[]} the min and max bounds for the geometry
 */
const measureBoundingBoxOfGeom3 = (geometry) => {
  let boundingBox = cache.get(geometry)
  if (boundingBox) return boundingBox

  if (mat4.isOnlyTransformScale(geometry.transforms)) {
    // get boundingBox of original points and transform it
    boundingBox = transformBoundingBox(measureBoundingBoxOfGeom3Polygons(geometry.polygons), geometry.transforms)
  } else {
    // transform the points and then caclulate the boundingBox
    boundingBox = measureBoundingBoxOfGeom3Polygons(geom3.toPolygons(geometry))
  }

  cache.set(geometry, boundingBox)
  return boundingBox
}

/*
 * swap values if specific axis value in the second vector has lower value than the axis value in first vector
 */
const fixBound = (i, v1, v2) => {
  if (v1[i] > v2[i]) {
    const tmp = v1[i]
    v1[i] = v2[i]
    v2[i] = tmp
  }
}

/*
 * Transform the given bounding box
 */
const transformBoundingBox = (boundingBox, transforms) => {
  if (!mat4.isIdentity(transforms)) {
    // create a new boundingBox. Mutating the passed boundingBox would break cached calculations
    boundingBox= [
      vec3.transform(vec3.create(), boundingBox[0], transforms),
      vec3.transform(vec3.create(), boundingBox[1], transforms),
    ]

    // we now have a new 2 vectors:  [v1,v2] => [ [x1,y1,z1],  [x2,y2,z2] ]
    // transform can move bounding box corner in such way that it is no longer true that
    //  - v1 = [min(x1,x2),min(y1,y2),min(z1,z2)]
    //  - v2 = [max(x1,x2),max(y1,y2),max(z1,z2)]
    fixBound(0, ...boundingBox) // swap x, if higher value is in first vector
    fixBound(1, ...boundingBox) // swap y, if higher value is in first vector
    fixBound(2, ...boundingBox) // swap z, if higher value is in first vector
  }
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
