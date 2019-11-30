const { create } = require('../../shape2/index')
const { EPS, areaEPS } = require('../constants')
const area = require('../../shape2/measureArea')
const fromPointsNoCheck = require('../../shape2/fromPointsNoCheck')
const vec4 = require('../../../math/vec4')

// project the 3D polygon onto a plane
const projectPolygon3ToOrthoNormalBasis = (poly3, orthobasis) => {
  let points2d = poly3.vertices.map(function (vertex) {
    return orthobasis.to2D(vertex.pos)
  })

  let result = fromPointsNoCheck(points2d)
  let resultArea = area(result)
  if (Math.abs(resultArea) < areaEPS) {
    // the polygon was perpendicular to the orthnormal plane. The resulting 2D polygon would be degenerate
    // return an empty area instead:
    result = create()
  } else if (resultArea < 0) {
    result = result.flipped()
  }
  return result
}

/** project the Geom3 onto a plane
 * This returns a Geom2 with the 'shadow' shape of the 3D solid when projected onto the
 * plane represented by the orthonormal basis
 * @param  {Geom3} geometry the object to project
 * @param  {Orthobasis} orthobasis the orthobasis to cut along
 */
const project = (geometry, orthobasis) => {
  let shape2s = []
  geometry.polygons.filter(function (p) {
    // only return polys in plane, others may disturb result
    return p.plane.normal.minus(orthobasis.plane.normal).lengthSquared() < (EPS * EPS)
  })
    .map( polygon => {
      let shape2 = projectPolygon3ToOrthoNormalBasis(polygon, orthobasis)
      if (shape2.sides.length > 0) {
        shape2s.push(shape2)
      }
    })
  // fixme why union ???
  let result = union(
    create(),
    shape2s
  )
  return result
}

module.exports = project
