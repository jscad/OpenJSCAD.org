const flatten = require('../../utils/flatten')

const measureEpsilon = require('../../measurements/measureEpsilon')

const geom2 = require('../../geometries/geom2')
const geom3 = require('../../geometries/geom3')
const path2 = require('../../geometries/path2')
const poly3 = require('../../geometries/poly3')


const snapPolygons = require('./snapPolygons')
const mergePolygons = require('./mergePolygons')
const repairTjunctions = require('./repairTjunctions')

/*
 */
const toTriangles = (polygons) => {
  const triangles = []
  polygons.forEach((polygon) => {
    const steps = polygon.vertices.length - 2
    if (steps > 1) {
      // NOTE: this is possible because poly3 is CONVEX by definition
      const firstVertex = polygon.vertices[0]
      for (let i = 0; i < steps; i++) {
        triangles.push(poly3.fromPoints([firstVertex, polygon.vertices[i + 1], polygon.vertices[i + 2]]))
      }
    } else {
      triangles.push(polygon)
    }
  })
  return triangles  
}

/*
 */
const generalizeGeom3 = (options, geometry) => {
  const defaults = {
    snap : false,
    simplify : false,
    triangulate : false,
    repair: false
  }
  const { snap, simplify, triangulate, repair } = Object.assign({}, defaults, options)

  const epsilon = measureEpsilon(geometry)
  let polygons = geom3.toPolygons(geometry)

  // snap the given geometry if requested
  if (snap) {
    polygons = snapPolygons(epsilon, polygons)
  }

  // simplify the polygons if requested
  if (simplify) {
    // TODO implement some mesh decimations
    polygons = mergePolygons(epsilon, polygons)
  }

  // triangulate the polygons if requested
  if (triangulate) {
    polygons = toTriangles(polygons)
  }

  // repair the polygons (possibly triangles) if requested
  if (repair) {
    // fix T junctions
    polygons = repairTjunctions(epsilon, polygons)
    // TODO fill holes
  }

  return geom3.create(polygons)
}

/**
 * Apply various modifications in proper order to produce a generalized geometry.
 * @return {Object|Array} the snapped geometry, or a list of snapped geometries
 */
const generalize = (options, ...geometries) => {
  geometries = flatten(geometries)
  if (geometries.length === 0) throw new Error('wrong number of arguments')

  const results = geometries.map((geometry, i) => {
    if (path2.isA(geometry)) return generalizePath2(options, geometry)
    if (geom2.isA(geometry)) return generalizeGeom2(options, geometry)
    if (geom3.isA(geometry)) return generalizeGeom3(options, geometry)
    throw new Error('invalid geometry')
  })
  return results.length === 1 ? results[0] : results
}

module.exports = generalize
