const FuzzyCSGFactory = require('../FuzzyFactory3d')
const reTesselateCoplanarPolygons = require('./reTesselateCoplanarPolygons')
const fromPolygons = require('./fromPolygons')

/*
  After CSG operations all coplanar polygon fragments are joined by a retesselating
  operation. See CSG.reTesselated(). Retesselation is done through a
  linear sweep over the polygon surface. The sweep line passes over the y coordinates
  of all vertices in the polygon. Polygons are split at each sweep line, and the fragments
  are joined horizontally and vertically into larger polygons (making sure that we
  will end up with convex polygons).
*/
const retessellate = function (csg) {
  if (csg.isRetesselated) {
    return csg
  } else {
    let polygonsPerPlane = {}
    let isCanonicalized = csg.isCanonicalized
    let fuzzyfactory = new FuzzyCSGFactory()
    csg.polygons.map(function (polygon) {
      let plane = polygon.plane
      let shared = polygon.shared
      if (!isCanonicalized) {
        // in order to identify polygons having the same plane, we need to canonicalize the planes
        // We don't have to do a full canonizalization (including vertices), to save time only do the planes and the shared data:
        plane = fuzzyfactory.getPlane(plane)
        shared = fuzzyfactory.getPolygonShared(shared)
      }
      let tag = plane.getTag() + '/' + shared.getTag()
      if (!(tag in polygonsPerPlane)) {
        polygonsPerPlane[tag] = [polygon]
      } else {
        polygonsPerPlane[tag].push(polygon)
      }
    })
    let destpolygons = []
    for (let planetag in polygonsPerPlane) {
      let sourcepolygons = polygonsPerPlane[planetag]
      if (sourcepolygons.length < 2) {
        destpolygons = destpolygons.concat(sourcepolygons)
      } else {
        const retesselayedpolygons = reTesselateCoplanarPolygons(sourcepolygons)
        destpolygons = destpolygons.concat(retesselayedpolygons)
      }
    }
    let result = fromPolygons(destpolygons)
    result.isRetesselated = true
    // result = result.canonicalized();
    result.properties = csg.properties // keep original properties
    return result
  }
}

module.exports = retessellate
