const flatten = require('../../utils/flatten')

const geom3 = require('../../geometry/geom3')
const poly3 = require('../../geometry/poly3')

const quickhull = require('./quickhull')

/*
 * Create a convex hull of the given geometries (geom3).
 * @param {...geometries} geometries - list of geom3 geometries
 * @returns {geom3} new geometry
 */
const hullGeom3 = (...geometries) => {
  geometries = flatten(geometries)

  if (geometries.length === 1) return geometries[0]

  // extract the unique vertices from the geometries
  let uniquevertices = []
  let found = new Map()
  for (let g = 0; g < geometries.length; ++g) {
    let polygons = geom3.toPolygons(geometries[g])
    for (let p = 0; p < polygons.length; ++p) {
      let vertices = polygons[p].vertices
      for (let v = 0; v < vertices.length; ++v) {
        let id = `${vertices[v]}`
        if (found.has(id)) continue
        uniquevertices.push(vertices[v])
        found.set(id, true)
      }
    }
  }
  found.clear()

  let faces = quickhull(uniquevertices, { skipTriangulation: true })

  let polygons = faces.map((face) => {
    let vertices = face.map((index) => uniquevertices[index])
    return poly3.create(vertices)
  })

  return geom3.create(polygons)
}

module.exports = hullGeom3
