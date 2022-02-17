const geom2 = require('../../../geometries/geom2')
const poly3 = require('../../../geometries/poly3')
const OrthoNormalBasis = require('../../../maths/OrthoNormalBasis')
const flatten = require('../../../utils/flatten')
const earcut = require('../earcut')
const calculatePlane = require('./calculatePlane')
const toTrees = require('./toTrees')

/**
 * Return a list of polygons which are enclosed by the slice.
 * @param {slice} slice - the slice
 * @return {Array} a list of polygons (3D)
 * @alias module:modeling/extrusions/slice.toTriangles
 */
const toTriangles = (slice) => {
  const plane = calculatePlane(slice)

  // Project to 2D plane
  const basis = new OrthoNormalBasis(plane)
  const projected = slice.edges.map((e) => e.map((v) => basis.to2D(v)))

  // compute polygon hierarchies
  const geometry = geom2.create(projected)
  const trees = toTrees(geometry)

  const triangles = []
  trees.forEach((tree) => {
    // hole indices
    let index = tree.solid.length
    const holesIndex = []
    tree.holes.forEach((hole, i) => {
      holesIndex.push(index)
      index += hole.length
    })

    // compute earcut triangulation for each solid
    const vertices = flatten([tree.solid, tree.holes])
    const getVertex = (i) => [vertices[i * 2], vertices[i * 2 + 1]]
    const indices = earcut(vertices, holesIndex)
    for (let i = 0; i < indices.length; i += 3) {
      // TODO: Map back to original vertices
      const tri = indices.slice(i, i + 3).map(getVertex).map((v) => basis.to3D(v))
      triangles.push(poly3.fromPointsAndPlane(tri, plane))
    }
  })

  return triangles
}

module.exports = toTriangles
