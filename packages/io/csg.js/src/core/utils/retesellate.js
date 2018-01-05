const FuzzyCSGFactory = require('../FuzzyFactory3d')
const reTesselateCoplanarPolygons = require('../math/reTesselateCoplanarPolygons')
const {fromPolygons} = require('../CSGFactories')

const reTesselate = function (csg) {
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
        let retesselayedpolygons = []
        reTesselateCoplanarPolygons(sourcepolygons, retesselayedpolygons)
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

module.exports = reTesselate
