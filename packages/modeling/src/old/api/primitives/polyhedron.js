const {fromPolygons} = require('../../core/CSGFactories')
const Polygon3 = require('../../core/math/Polygon3')
const Vector3 = require('../../core/math/Vector3')
const Vertex3 = require('../../core/math/Vertex3')

/** Construct a polyhedron from the given triangles/ polygons/points
 * @param {Object} [options] - options for construction
 * @param {Array} [options.triangles] - triangles to build the polyhedron from
 * @param {Array} [options.polygons] - polygons to build the polyhedron from
 * @param {Array} [options.points] - points to build the polyhedron from
 * @param {Array} [options.colors] - colors to apply to the polyhedron
 * @returns {CSG} new polyhedron
 *
 * @example
 * let torus1 = polyhedron({
 *   points: [...]
 * })
 */
function polyhedron (params) {
  let pgs = []
  let ref = params.triangles || params.polygons
  let colors = params.colors || null

  for (let i = 0; i < ref.length; i++) {
    let pp = []
    for (let j = 0; j < ref[i].length; j++) {
      pp[j] = params.points[ref[i][j]]
    }

    let v = []
    for (let j = ref[i].length - 1; j >= 0; j--) { // --- we reverse order for examples of OpenSCAD work
      v.push(new Vertex3(new Vector3(pp[j][0], pp[j][1], pp[j][2])))
    }
    let s = Polygon3.defaultShared
    if (colors && colors[i]) {
      s = Polygon3.Shared.fromColor(colors[i])
    }
    pgs.push(new Polygon3(v, s))
  }

  // forced to import here, otherwise out of order imports mess things up
  return fromPolygons(pgs)
}

// it is defined twice ???
/** Create a polyhedron using Openscad style arguments. NON API !
 * Define face vertices clockwise looking from outside.
 * @param {Object} [options] - options for construction
 * @returns {CSG} new 3D solid
 */
const _polyhedron = function (options) {
  options = options || {}
  if (('points' in options) !== ('faces' in options)) {
    throw new Error("polyhedron needs 'points' and 'faces' arrays")
  }
  let vertices = parseOptionAs3DVectorList(options, 'points', [
            [1, 1, 0],
            [1, -1, 0],
            [-1, -1, 0],
            [-1, 1, 0],
            [0, 0, 1]
  ])
        .map(function (pt) {
          return new Vertex3(pt)
        })
  let faces = parseOption(options, 'faces', [
            [0, 1, 4],
            [1, 2, 4],
            [2, 3, 4],
            [3, 0, 4],
            [1, 0, 3],
            [2, 1, 3]
  ])
    // Openscad convention defines inward normals - so we have to invert here
  faces.forEach(function (face) {
    face.reverse()
  })
  let polygons = faces.map(function (face) {
    return new Polygon3(face.map(function (idx) {
      return vertices[idx]
    }))
  })

    // TODO: facecenters as connectors? probably overkill. Maybe centroid
    // the re-tesselation here happens because it's so easy for a user to
    // create parametrized polyhedrons that end up with 1-2 dimensional polygons.
    // These will create infinite loops at CSG.Tree()
  return fromPolygons(polygons).reTesselated()
}

module.exports = polyhedron
