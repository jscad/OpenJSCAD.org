const flatten = require('../../utils/flatten')

const aboutEqualNormals = require('../../maths/utils/aboutEqualNormals')
const plane = require('../../maths/plane')
const mat4 = require('../../maths/mat4')

const geom2 = require('../../geometries/geom2')
const geom3 = require('../../geometries/geom3')
const poly3 = require('../../geometries/poly3')

const measureEpsilon = require('../../measurements/measureEpsilon')

const unionGeom2 = require('../booleans/unionGeom2')

const projectGeom3 = (options, geometry) => {
  // create a plane from the options, and verify
  const projplane = plane.fromNormalAndPoint(plane.create(), options.axis, options.origin)
  if (Number.isNaN(projplane[0]) || Number.isNaN(projplane[1]) || Number.isNaN(projplane[2]) || Number.isNaN(projplane[3])) {
    throw new Error('project: invalid axis or origin')
  }

  const epsilon = measureEpsilon(geometry)
  const epsilonArea = (epsilon * epsilon * Math.sqrt(3) / 4)

  if (epsilon === 0) return geom2.create()

  // project the polygons to the plane
  const polygons = geom3.toPolygons(geometry)
  let projpolys = []
  for (let i = 0; i < polygons.length; i++) {
    const newpoints = polygons[i].vertices.map((v) => plane.projectionOfPoint(projplane, v))
    const newpoly = poly3.create(newpoints)
    // only keep projections that face the same direction as the plane
    const newplane = poly3.plane(newpoly)
    if (!aboutEqualNormals(projplane, newplane)) continue
    // only keep projections that have a measurable area
    if (poly3.measureArea(newpoly) < epsilonArea) continue
    projpolys.push(newpoly)
  }

  // rotate the polygons to lay on X/Y axes if necessary
  if (!aboutEqualNormals(projplane, [0, 0, 1])) {
    const rotation = mat4.fromVectorRotation(mat4.create(), projplane, [0, 0, 1])
    projpolys = projpolys.map((p) => poly3.transform(rotation, p))
  }

  // sort the polygons to allow the union to ignore small pieces efficiently
  projpolys = projpolys.sort((a, b) => poly3.measureArea(b) - poly3.measureArea(a))

  // convert polygons to geometry, and union all pieces into a single geometry
  const projgeoms = projpolys.map((p) => geom2.fromPoints(p.vertices))
  return unionGeom2(projgeoms)
}

/**
 * Project the given 3D geometry on to the given plane.
 * @param {Object} options - options for project
 * @param {Array} [options.axis=[0,0,1]] the axis of the plane (default is Z axis)
 * @param {Array} [options.origin=[0,0,0]] the origin of the plane
 * @param {...Object} objects - the list of 3D geometry to project
 * @return {geom2|Array} the projected 2D geometry, or a list of 2D projected geometry
 * @alias module:modeling/extrusions.project
 *
 * @example
 * let myshape = project({}, sphere({radius: 20, segments: 5}))
 */
const project = (options, ...objects) => {
  const defaults = {
    axis: [0, 0, 1], // Z axis
    origin: [0, 0, 0]
  }
  const { axis, origin } = Object.assign({ }, defaults, options)

  objects = flatten(objects)
  if (objects.length === 0) throw new Error('wrong number of arguments')

  options = { axis, origin }

  const results = objects.map((object) => {
    // if (path.isA(object)) return project(options, object)
    // if (geom2.isA(object)) return project(options, object)
    if (geom3.isA(object)) return projectGeom3(options, object)
    return object
  })
  return results.length === 1 ? results[0] : results
}

module.exports = project
