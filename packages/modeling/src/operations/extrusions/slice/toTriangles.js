const geom2 = require('../../../geometries/geom2')
const poly2 = require('../../../geometries/poly2')
const poly3 = require('../../../geometries/poly3')
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

  // compute polygon hierarchies
  const geometry = geom2.create(slice.edges)
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
    const getVertex = (i) => [vertices[i * 3], vertices[i * 3 + 1], vertices[i * 3 + 2]]
    const indices = earcut(vertices, holesIndex, 3)
    for (let i = 0; i < indices.length; i += 3) {
      triangles.push(poly3.fromPointsAndPlane(
        [getVertex(indices[i]), getVertex(indices[i + 1]), getVertex(indices[i + 2])],
        plane
      ))
    }
  })

  return triangles
}

module.exports = toTriangles
