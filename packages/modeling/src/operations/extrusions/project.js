const flatten = require('../../utils/flatten')

const aboutEqualNormals = require('../../maths/utils/aboutEqualNormals')
const plane = require('../../maths/plane')
const mat4 = require('../../maths/mat4')

const geom2 = require('../../geometries/geom2')
const geom3 = require('../../geometries/geom3')
const poly3 = require('../../geometries/poly3')

const measureEpsilon = require('../../measurements/measureEpsilon')

const unionGeom2 = require('../booleans/unionGeom2')
const unionGeom3 = require('../booleans/unionGeom3')

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
  const projpolys = []
  for (let i = 0; i < polygons.length; i++) {
    const newpoints = polygons[i].vertices.map((v) => plane.projectionOfPoint(projplane, v))
    const newpoly = poly3.create(newpoints)
    // only keep projections that have a measurable area
    if (poly3.measureArea(newpoly) < epsilonArea) continue
    // only keep projections that face the same direction as the plane
    const newplane = poly3.plane(newpoly)
    if (!aboutEqualNormals(projplane, newplane)) continue
    projpolys.push(newpoly)
  }
  // union the projected polygons to eliminate overlaying polygons
  let projection = geom3.create(projpolys)
  projection = unionGeom3(projection, projection)
  // rotate the projection to lay on X/Y axes if necessary
  if (!aboutEqualNormals(projplane, [0, 0, 1])) {
    const rotation = mat4.fromVectorRotation(mat4.create(), projplane, [0, 0, 1])
    projection = geom3.transform(rotation, projection)
  }

  // convert the projection (polygons) into a series of 2D geometry
  const projections2D = geom3.toPolygons(projection).map((p) => geom2.fromPoints(poly3.toPoints(p)))
  // union the 2D geometries to obtain the outline of the projection
  projection = unionGeom2(projections2D)

  return projection
}

/**
 * Project the given geometry on to the given plane.
 * @param {Object} options - options for project
 * @param {Array} [options.axis=[0,0,1]] the axis of the plane (default is Z axis)
 * @param {Array} [options.origin=[0,0,0]] the origin of the plane
 * @param {...Object} geometry - the list of geometry to project
 * @return {geom2|Array} the projected geometry, or a list of projected geometry
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
