const geom2 = require('../../../geometries/geom2')
const poly2 = require('../../../geometries/poly2')
const poly3 = require('../../../geometries/poly3')
const flatten = require('../../../utils/flatten')
const earcut = require('../earcut')
const calculatePlane = require('./calculatePlane')

/**
 * Return a list of polygons which are enclosed by the slice.
 * @param {slice} slice - the slice
 * @return {Array} a list of polygons (3D)
 * @alias module:modeling/extrusions/slice.toTriangles
 */
const toTriangles = (slice) => {
  const plane = calculatePlane(slice)

  // compute outlines
  const outlines = geom2.toOutlines(geom2.create(slice.edges))

  // find holes
  const holes = []
  const solids = []
  outlines.forEach((points) => {
    const area = poly2.measureArea({vertices: points})
    if (area < 0) {
      holes.push(points)
    } else {
      // Append the start point so that multi-solids can be connected
      solids.push([...points, points[0]])
    }
  })

  // hole indices
  let index = flatten(solids).length / 3
  const holesIndex = []
  holes.forEach((hole, i) => {
    holesIndex.push(index)
    index += hole.length
  })

  // compute earcut triangulation for each solid
  const vertices = flatten([solids, holes])
  const indices = earcut(vertices, holesIndex, 3)
  const triangles = []
  const getVertex = (i) => [vertices[i * 3], vertices[i * 3 + 1], vertices[i * 3 + 2]]
  for (let i = 0; i < indices.length; i += 3) {
    triangles.push(poly3.fromPointsAndPlane(
      [getVertex(indices[i]), getVertex(indices[i + 1]), getVertex(indices[i + 2])],
      plane
    ))
  }

  return triangles
}

module.exports = toTriangles
