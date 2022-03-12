const poly3 = require('../../../geometries/poly3')
const earcut = require('../earcut')
const PolygonHierarchy = require('../earcut/polygonHierarchy')

/**
 * Return a list of polygons which are enclosed by the slice.
 * @param {slice} slice - the slice
 * @return {Array} a list of polygons (3D)
 * @alias module:modeling/extrusions/slice.toPolygons
 */
const toPolygons = (slice) => {
  const hierarchy = new PolygonHierarchy(slice)

  const polygons = []
  hierarchy.roots.forEach(({ solid, holes }) => {
    // hole indices
    let index = solid.length
    const holesIndex = []
    holes.forEach((hole, i) => {
      holesIndex.push(index)
      index += hole.length
    })

    // compute earcut triangulation for each solid
    const vertices = [solid, ...holes].flat()
    const data = vertices.flat()
    // Get original 3D vertex by index
    const getVertex = (i) => hierarchy.to3D(vertices[i])
    const indices = earcut(data, holesIndex)
    for (let i = 0; i < indices.length; i += 3) {
      // Map back to original vertices
      const tri = indices.slice(i, i + 3).map(getVertex)
      polygons.push(poly3.fromPointsAndPlane(tri, hierarchy.plane))
    }
  })

  return polygons
}

module.exports = toPolygons
