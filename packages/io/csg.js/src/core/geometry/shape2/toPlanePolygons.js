const {intersectSub} = require('../ops-booleans/intersection') 
/*
* transform a cag into the polygons of a corresponding 3d plane, positioned per options
* Accepts a connector for plane positioning, or optionally
* single translation, axisVector, normalVector arguments
* (toConnector has precedence over single arguments if provided)
*/
const toPlanePolygons = function (_cag, options) {
  const defaults = {
    flipped: false
  }
  options = Object.assign({}, defaults, options)
  let {flipped} = options
    // reference connector for transformation
  let origin = [0, 0, 0]
  let defaultAxis = [0, 0, 1]
  let defaultNormal = [0, 1, 0]
  let thisConnector = new Connector(origin, defaultAxis, defaultNormal)
    // translated connector per options
  let translation = options.translation || origin
  let axisVector = options.axisVector || defaultAxis
  let normalVector = options.normalVector || defaultNormal
    // will override above if options has toConnector
  let toConnector = options.toConnector ||
            new Connector(translation, axisVector, normalVector)
    // resulting transform
  let m = thisConnector.getTransformationTo(toConnector, false, 0)
    // create plane as a (partial non-closed) CSG in XY plane
  let bounds = _cag.getBounds()
  bounds[0] = bounds[0].minus(new Vector2D(1, 1))
  bounds[1] = bounds[1].plus(new Vector2D(1, 1))
  let csgshell = toCSGWall(_cag, -1, 1)
  let csgplane = fromPolygons([new Polygon3([
    new Vertex3D(new Vector3D(bounds[0].x, bounds[0].y, 0)),
    new Vertex3D(new Vector3D(bounds[1].x, bounds[0].y, 0)),
    new Vertex3D(new Vector3D(bounds[1].x, bounds[1].y, 0)),
    new Vertex3D(new Vector3D(bounds[0].x, bounds[1].y, 0))
  ])])
  if (flipped) {
    csgplane = csgplane.invert()
  }
    // intersectSub -> prevent premature retesselate/canonicalize
  csgplane = intersectSub(csgplane, csgshell)
    // only keep the polygons in the z plane:
  let polys = csgplane.polygons.filter(function (polygon) {
    return Math.abs(polygon.plane.normal.z) > 0.99
  })
    // finally, position the plane per passed transformations
  return polys.map(function (poly) {
    return poly.transform(m)
  })
}

module.exports = toPlanePolygons
