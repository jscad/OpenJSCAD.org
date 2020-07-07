const vec3 = require('../../maths/vec3')

const geom3 = require('../../geometry/geom3')
const poly3 = require('../../geometry/poly3')

const reTesselateCoplanarPolygons = require('./reTesselateCoplanarPolygons')

const coplanar = (plane1, plane2) => {
  // expect the same distance from the origin, within tolerance
  if (Math.abs(plane1[3] - plane2[3]) < 0.00000015) {
    // expect a zero (0) angle between the normals
    if (vec3.angle(plane1, plane2) === 0) return true
  }
  return false
}

/*
  After boolean operations all coplanar polygon fragments are joined by a retesselating
  operation. geom3.reTesselate(geom).
  Retesselation is done through a linear sweep over the polygon surface.
  The sweep line passes over the y coordinates of all vertices in the polygon.
  Polygons are split at each sweep line, and the fragments are joined horizontally and vertically into larger polygons
  (making sure that we will end up with convex polygons).
*/
const retessellate = (geometry) => {
  if (geometry.isRetesselated) {
    return geometry
  }

  const polygons = geom3.toPolygons(geometry)
  const polygonsPerPlane = [] // elements: [plane, [poly3...]]
  polygons.forEach((polygon) => {
    const mapping = polygonsPerPlane.find((element) => coplanar(element[0], poly3.plane(polygon)))
    if (mapping) {
      const polygons = mapping[1]
      polygons.push(polygon)
    } else {
      polygonsPerPlane.push([poly3.plane(polygon), [polygon]])
    }
  })

  let destpolygons = []
  polygonsPerPlane.forEach((mapping) => {
    const sourcepolygons = mapping[1]
    const retesselayedpolygons = reTesselateCoplanarPolygons(sourcepolygons)
    destpolygons = destpolygons.concat(retesselayedpolygons)
  })

  const result = geom3.create(destpolygons)
  result.isRetesselated = true

  return result
}

module.exports = retessellate
