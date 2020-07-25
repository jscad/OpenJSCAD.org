const geom3 = require('../geometries/geom3')
const poly3 = require('../geometries/poly3')

/**
 * Construct a polyhedron in three dimensional space from the given set of points and faces.
 * The faces can define outward or inward facing polygons (orientation).
 * However, each face must define a counter clockwise rotation of points which follows the right hand rule.
 * @param {Object} options - options for construction
 * @param {Array} options.points=[] - list of points in 3D space
 * @param {Array} options.faces=[] - list of faces, where each face is a set of indexes into the points
 * @param {Array} [options.colors=undefined] - list of RGBA colors to apply to each face
 * @param {Array} [options.orientation='outward'] - orientation of faces
 * @returns {geom3} new 3D geometry
 * @alias module:modeling/primitives.polyhedron
 *
 * @example
 * let mypoints = [ [10, 10, 0], [10, -10, 0], [-10, -10, 0], [-10, 10, 0], [0, 0, 10] ]
 * let myfaces = [ [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4], [1, 0, 3], [2, 1, 3] ]
 * let myshape = polyhedron({points: mypoint, faces: myfaces, orientation: 'inward'})
 */
const polyhedron = (options) => {
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

  // invert the faces if orientation is inwards, as all internals expect outwarding facing polygons
  if (orientation !== 'outward') {
    faces.forEach((face) => face.reverse())
  }

  const polygons = faces.map((face, findex) => {
    const polygon = poly3.fromPoints(face.map((pindex) => points[pindex]))
    if (colors && colors[findex]) polygon.color = colors[findex]
    return polygon
  })

  return geom3.create(polygons)
}

module.exports = polyhedron
