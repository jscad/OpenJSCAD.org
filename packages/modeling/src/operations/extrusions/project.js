import { flatten } from '../../utils/flatten.js'

import { aboutEqualNormals } from '../../maths/utils/aboutEqualNormals.js'

import * as plane from '../../maths/plane/index.js'
import * as mat4 from '../../maths/mat4/index.js'
import * as vec2 from '../../maths/vec2/index.js'

import * as geom2 from '../../geometries/geom2/index.js'
import * as geom3 from '../../geometries/geom3/index.js'
import * as poly3 from '../../geometries/poly3/index.js'

import { measureEpsilon } from '../../measurements/measureEpsilon.js'

import { unionGeom2 } from '../booleans/unionGeom2.js'

const projectGeom3 = (options, geometry) => {
  // create a plane from the options, and verify
  const projPlane = plane.fromNormalAndPoint(plane.create(), options.axis, options.origin)
  if (Number.isNaN(projPlane[0]) || Number.isNaN(projPlane[1]) || Number.isNaN(projPlane[2]) || Number.isNaN(projPlane[3])) {
    throw new Error('project: invalid axis or origin')
  }

  const epsilon = measureEpsilon(geometry)
  const epsilonArea = (epsilon * epsilon * Math.sqrt(3) / 4)

  if (epsilon === 0) return geom2.create()

  // project the polygons to the plane
  const polygons = geom3.toPolygons(geometry)
  let projPolys = []
  for (let i = 0; i < polygons.length; i++) {
    const newVertices = polygons[i].vertices.map((v) => plane.projectionOfPoint(projPlane, v))
    const newPoly = poly3.create(newVertices)
    // only keep projections that face the same direction as the plane
    const newPlane = poly3.plane(newPoly)
    if (!aboutEqualNormals(projPlane, newPlane)) continue
    // only keep projections that have a measurable area
    if (poly3.measureArea(newPoly) < epsilonArea) continue
    projPolys.push(newPoly)
  }

  // rotate the polygons to lay on X/Y axes if necessary
  if (!aboutEqualNormals(projPlane, [0, 0, 1])) {
    const rotation = mat4.fromVectorRotation(mat4.create(), projPlane, [0, 0, 1])
    projPolys = projPolys.map((p) => poly3.transform(rotation, p))
  }

  // sort the polygons to allow the union to ignore small pieces efficiently
  projPolys = projPolys.sort((a, b) => poly3.measureArea(b) - poly3.measureArea(a))

  // convert polygons to geometry, and union all pieces into a single geometry
  const projGeoms = projPolys.map((p) => {
    // This clones the points from vec3 to vec2
    const cloned = p.vertices.map(vec2.clone)
    return geom2.create([cloned])
  })

  return unionGeom2(projGeoms)
}

/**
 * Project the given 3D geometry on to the given plane.
 * @param {object} options - options for project
 * @param {Array} [options.axis=[0,0,1]] the axis of the plane (default is Z axis)
 * @param {Array} [options.origin=[0,0,0]] the origin of the plane
 * @param {...Object} objects - the list of 3D geometry to project
 * @return {Geom2|Array} the projected 2D geometry, or a list of 2D projected geometry
 * @alias module:modeling/extrusions.project
 *
 * @example
 * let myshape = project({}, sphere({radius: 20, segments: 5}))
 */
export const project = (options, ...objects) => {
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
