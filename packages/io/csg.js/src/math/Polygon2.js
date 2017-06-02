const CAG = require('../CAG')

/*
2D polygons are now supported through the CAG class.
With many improvements (see documentation):
  - shapes do no longer have to be convex
  - union/intersect/subtract is supported
  - expand / contract are supported

But we'll keep CSG.Polygon2D as a stub for backwards compatibility
*/
function Polygon2D (points) {
  const cag = CAG.fromPoints(points)
  this.sides = cag.sides
}

Polygon2D.prototype = CAG.prototype

module.exports = Polygon2D
