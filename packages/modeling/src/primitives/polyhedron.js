const geom3 = require('../geometry/geom3')
const poly3 = require('../geometry/poly3')

/** Create a polyhedron from the given set of points and faces.
 * The faces can define outward or inward facing polygons (orientation).
 * However, each face must define a counter clockwise rotation of points which follows the right hand rule.
 * @param {Object} options - options for construction
 * @param {Array} options.points - list of points in 3D space
 * @param {Array} options.faces - list of faces, where each face is a set of indexes into the points
 * @param {Array} [options.orientation='outward'] - orientation of faces
 * @returns {geom3} new 3D geometry
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
    orientation: 'outward'
  }
  const {points, faces, orientation} = Object.assign({}, defaults, options)

  if (!(Array.isArray(points) && Array.isArray(faces))) {
    throw new Error('points and faces must be arrays')
  }
  if (points.length < 3) {
    throw new Error('three or more points are required')
  }
  if (faces.length < 1) {
    throw new Error('one or more faces are required')
  }

  // invert the faces if orientation is inwards, as all internals expect outwarding facing polygons
  if (orientation !== 'outward') {
    faces.forEach((face) => face.reverse())
  }

  let polygons = faces.map((face) => poly3.fromPoints(face.map((idx) => points[idx])))
  return geom3.create(polygons)
}

module.exports = polyhedron
