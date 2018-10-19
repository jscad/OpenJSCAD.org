const toVec3Pairs = require('./toVec3Pairs')

/*
* given 2 connectors, this returns all polygons of a "wall" between 2
* copies of this cag, positioned in 3d space as "bottom" and
* "top" plane per connectors toConnector1, and toConnector2, respectively
*/
const toWallPolygons = function (shape2, options) {
  // normals are going to be correct as long as toConn2.point - toConn1.point
  // points into cag normal direction (check in caller)
  // arguments: options.toConnector1, options.toConnector2, options.cag
  //     walls go from toConnector1 to toConnector2
  //     optionally, target cag to point to - cag needs to have same number of sides as this!
  let origin = [0, 0, 0]
  let defaultAxis = [0, 0, 1]
  let defaultNormal = [0, 1, 0]
  let thisConnector = new Connector(origin, defaultAxis, defaultNormal)
  // arguments:
  let toConnector1 = options.toConnector1
  // let toConnector2 = new Connector([0, 0, -30], defaultAxis, defaultNormal);
  let toConnector2 = options.toConnector2
  if (!(toConnector1 instanceof Connector && toConnector2 instanceof Connector)) {
    throw new Error('could not parse Connector arguments toConnector1 or toConnector2')
  }
  if (options.cag) {
    if (options.cag.sides.length !== this.sides.length) {
      throw new Error('target cag needs same sides count as start cag')
    }
  }
  // target cag is same as this unless specified
  let toCag = options.cag || shape2
  let m1 = thisConnector.getTransformationTo(toConnector1, false, 0)
  let m2 = thisConnector.getTransformationTo(toConnector2, false, 0)
  let vps1 = toVec3Pairs(shape2, m1)
  let vps2 = toVec3Pairs(toCag, m2)

  let polygons = []
  vps1.forEach(function (vp1, i) {
    polygons.push(new Polygon3([
      new Vertex3D(vps2[i][1]), new Vertex3D(vps2[i][0]), new Vertex3D(vp1[0])]))
    polygons.push(new Polygon3([
      new Vertex3D(vps2[i][1]), new Vertex3D(vp1[0]), new Vertex3D(vp1[1])]))
  })
  return polygons
}

module.exports = toWallPolygons
