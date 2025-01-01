import * as geom3 from '../geometries/geom3/index.js'
import * as poly3 from '../geometries/poly3/index.js'

import { isNumberArray } from './commonChecks.js'

/**
 * Construct a polyhedron in three dimensional space from the given set of 3D vertices and faces.
 *
 * The faces can define outward or inward facing polygons (orientation).
 * However, each face must define a counterclockwise rotation of vertices which follows the right hand rule.
 * @param {object} options - options for construction
 * @param {Array} options.points - list of points in 3D space
 * @param {Array} options.faces - list of faces, where each face is a set of indexes into the points
 * @param {Array} [options.colors=undefined] - list of RGBA colors to apply to each face
 * @param {string} [options.orientation='outward'] - orientation of faces
 * @returns {Geom3} new 3D geometry
 * @alias module:modeling/primitives.polyhedron
 *
 * @example
 * let myPoints = [ [10, 10, 0], [10, -10, 0], [-10, -10, 0], [-10, 10, 0], [0, 0, 10] ]
 * let myFaces = [ [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4], [1, 0, 3], [2, 1, 3] ]
 * let myShape = polyhedron({points: myPoints, faces: myFaces, orientation: 'inward'})
 */
export const polyhedron = (options) => {
  const defaults = {
    points: [],
    faces: [],
    colors: undefined,
    orientation: 'outward'
  }
  const { points, faces, colors, orientation } = Object.assign({}, defaults, options)

  if (!(Array.isArray(points) && Array.isArray(faces))) {
    throw new Error('points and faces must be arrays')
  }
  if (points.length < 3) {
    throw new Error('three or more points are required')
  }
  if (faces.length < 1) {
    throw new Error('one or more faces are required')
  }
  if (colors) {
    if (!Array.isArray(colors)) {
      throw new Error('colors must be an array')
    }
    if (colors.length !== faces.length) {
      throw new Error('faces and colors must have the same length')
    }
  }
  points.forEach((vertex, i) => {
    if (!isNumberArray(vertex, 3)) throw new Error(`vertex ${i} must be an array of X, Y, Z values`)
  })
  faces.forEach((face, i) => {
    if (face.length < 3) throw new Error(`face ${i} must contain 3 or more indexes`)
    if (!isNumberArray(face, face.length)) throw new Error(`face ${i} must be an array of numbers`)
  })

  // invert the faces if orientation is inwards, as all internals expect outward facing polygons
  if (orientation !== 'outward') {
    faces.forEach((face) => face.reverse())
  }

  const polygons = faces.map((face, findex) => {
    const polygon = poly3.create(face.map((pindex) => points[pindex]))
    if (colors && colors[findex]) polygon.color = colors[findex]
    return polygon
  })

  return geom3.create(polygons)
}
