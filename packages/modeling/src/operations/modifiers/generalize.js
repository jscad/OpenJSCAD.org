const flatten = require('../../utils/flatten')

const measureEpsilon = require('../../measurements/measureEpsilon')

const geom2 = require('../../geometries/geom2')
const geom3 = require('../../geometries/geom3')
const path2 = require('../../geometries/path2')

const snapPolygons = require('./snapPolygons')
const mergePolygons = require('./mergePolygons')
const insertTjunctions = require('./insertTjunctions')
const triangulatePolygons = require('./triangulatePolygons')

const repairTjunctions = require('./repairTjunctions')

/*
 */
const generalizePath2 = (options, geometry) => {
  return geometry
}


/*
 */
const generalizeGeom2 = (options, geometry) => {
  return geometry
}

/*
 */
const generalizeGeom3 = (options, geometry) => {
  const defaults = {
    snap: false,
    simplify: false,
    triangulate: false,
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
    polygons = insertTjunctions(polygons)
    polygons = triangulatePolygons(epsilon, polygons)
  }

  // repair the polygons (possibly triangles) if requested
  if (repair) {
    // fix T junctions
    polygons = repairTjunctions(epsilon, polygons)
    // TODO fill holes
  }

  // FIXME replace with geom3.cloneShallow() when available
  const clone = Object.assign({}, geometry)
  clone.polygons = polygons

  return clone
}

/**
 * Apply various modifications in proper order to produce a generalized geometry.
 * @param {Object} options - options for modifications
 * @param {Boolean} [options.snap=false] the geometries should be snapped to epsilons
 * @param {Boolean} [options.simplify=false] the geometries should be simplified
 * @param {Boolean} [options.triangulate=false] the geometries should be triangulated
 * @param {Boolean} [options.repair=false] the geometries should be repaired
 * @return {Object|Array} the modified geometry, or a list of modified geometries
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
