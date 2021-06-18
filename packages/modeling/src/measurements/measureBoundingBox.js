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
 * Measure the min and max bounds of the given (path2) geometry.
 * @return {Array[]} the min and max bounds for the geometry
 */
const measureBoundingBoxOfPath2 = (geometry) => {
  let boundingBox = cache.get(geometry)
  if (boundingBox) return boundingBox

  let transforms = geometry.transforms
  let points

  if(mat4.isOnlyTransformScale(transforms)){
    points = geometry.points
    boundingBox = cache.get(points)
  }else{
    transforms = null
    points = path2.toPoints(geometry)
  }


  if (!boundingBox) {
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
  }

  if (transforms && !mat4.isIdentity(transforms)) {
    boundingBox = [vec3.transform(boundingBox[0], boundingBox[0], transforms), vec3.transform(boundingBox[1], boundingBox[1], transforms)]
  }

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

  let points = geometry.points
  const transforms = geometry.transforms
  let minpoint, maxpoint
  const cacheKey = points || geometry.sides

  if(mat4.isOnlyTransformScale(transforms)){
    points = geometry.points
    // check cache for identity boundingBox
    boundingBox = cache.get(cacheKey)
  }else{
    transforms = null
    points = geom2.toPoints(geometry)
  }

  if (!boundingBox) {
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
      const sides = geometry.sides
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
    // cache identity boundingBox
    cache.set(cacheKey, boundingBox)
  }

  if (transforms && !mat4.isIdentity(transforms)) {
    boundingBox = [vec3.transform(boundingBox[0], boundingBox[0], transforms), vec3.transform(boundingBox[1], boundingBox[1], transforms)]
  }

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

  let transforms = geometry.transforms
  let polygons

  if(mat4.isOnlyTransformScale(transforms)){
    polygons = geometry.polygons
    boundingBox = cache.get(polygons)
  }else{
    transforms = null
    polygons = geom3.toPolygons(geometry)
  }  

  if(!boundingBox){

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

    boundingBox = [[minpoint[0], minpoint[1], minpoint[2]], [maxpoint[0], maxpoint[1], maxpoint[2]]]
    // cache identity boundingBox
    cache.set(polygons, boundingBox)
  }

  if (transforms && !mat4.isIdentity(transforms)) {
    boundingBox = [vec3.transform(boundingBox[0], boundingBox[0], transforms), vec3.transform(boundingBox[1], boundingBox[1], transforms)]
  }
  cache.set(geometry, boundingBox)

  return boundingBox
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
