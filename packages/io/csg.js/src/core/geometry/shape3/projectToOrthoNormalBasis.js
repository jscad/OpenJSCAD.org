const { create } = require('../shape2/index')
const { EPS, areaEPS } = require('../constants')
const area = require('../shape2/measureArea')
const fromPointsNoCheck = require('../shape2/fromPointsNoCheck')

// project the 3D polygon onto a plane
const projectPolygon3ToOrthoNormalBasis = function (poly3, orthobasis) {
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

/** project the Shape3 onto a plane
 * This returns a Shape2 with the 'shadow' shape of the 3D solid when projected onto the
 * plane represented by the orthonormal basis
 * @param  {Shape3} shape the shape3 object to cut
 * @param  {Orthobasis} orthobasis the orthobasis to cut along
 */
const projectToOrthoNormalBasis = function (shape, orthobasis) {
  let cags = []
  shape.polygons.filter(function (p) {
    // only return polys in plane, others may disturb result
    return p.plane.normal.minus(orthobasis.plane.normal).lengthSquared() < (EPS * EPS)
  })
    .map(function (polygon) {
      let cag = projectPolygon3ToOrthoNormalBasis(polygon, orthobasis)
      if (cag.sides.length > 0) {
        cags.push(cag)
      }
    })
  // fixme why union ???
  let result = union(
    create(),
    cags
  )
  return result
}

module.exports = projectToOrthoNormalBasis
