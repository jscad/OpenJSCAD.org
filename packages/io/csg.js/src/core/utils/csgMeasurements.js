const Vector3D = require('../math/Vector3')

/**
   * Returns an array of Vector3D, providing minimum coordinates and maximum coordinates
   * of this solid.
   * @returns {Vector3D[]}
   * @example
   * let bounds = A.getBounds()
   * let minX = bounds[0].x
   */
const bounds = function (csg) {
  if (!csg.cachedBoundingBox) {
    let minpoint = new Vector3D(0, 0, 0)
    let maxpoint = new Vector3D(0, 0, 0)
    let polygons = csg.polygons
    let numpolygons = polygons.length
    for (let i = 0; i < numpolygons; i++) {
      let polygon = polygons[i]
      let bounds = polygon.boundingBox()
      if (i === 0) {
        minpoint = bounds[0]
        maxpoint = bounds[1]
      } else {
        minpoint = minpoint.min(bounds[0])
        maxpoint = maxpoint.max(bounds[1])
      }
    }
      // FIXME: not ideal, we are mutating the input, we need to move some of it out
    csg.cachedBoundingBox = [minpoint, maxpoint]
  }
  return csg.cachedBoundingBox
}

const volume = function (csg) {
  let result = csg.toTriangles().map(function (triPoly) {
    return triPoly.getTetraFeatures(['volume'])
  })
  console.log('volume', result)
}

const area = function (csg) {
  let result = csg.toTriangles().map(function (triPoly) {
    return triPoly.getTetraFeatures(['area'])
  })
  console.log('area', result)
}

module.exports = {bounds, volume, area}
