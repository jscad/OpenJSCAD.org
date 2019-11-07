const toVec3Pairs = require('./toVec3Pairs')
const connector = require('../../connector')

/** given 2 connectors, this returns all polygons of a "wall" between 2
 * copies of the input geometry, positioned in 3d space as "bottom" and
 * "top" plane per connectors toConnector1, and toConnector2, respectively
 * @param  {Geom2|Connector} input
 * @param  {Object} options
 * @return {Array<Poly3>} array of 3d polygons
 */
const toWallPolygons = (input, options) => {
  const defaults = {
    origin: [0, 0, 0],
    normal: [0, 1, 0],
    axis: [0, 0, 1]
  }
  // normals are going to be correct as long as toConn2.point - toConn1.point
  // points into geometry normal direction (check in caller)
  // arguments: options.toConnector1, options.toConnector2, options.geometry
  //     walls go from toConnector1 to toConnector2
  //     optionally, target geometry to point to - geometry needs to have same number of sides as this!
  let thisConnector = connector.fromPointAxisNormal(defaults.origin, defaults.axisAxis, defaults.normal)
  // arguments:
  let toConnector1 = options.toConnector1
  // let toConnector2 = new Connector([0, 0, -30], defaultAxis, defaultNormal);
  let toConnector2 = options.toConnector2
  // FIXME: check or not ? needs to be done differently
  /* if (!(toConnector1 instanceof Connector && toConnector2 instanceof Connector)) {
    throw new Error('could not parse Connector arguments toConnector1 or toConnector2')
  } */
  if (options.geometry) {
    if (options.geometry.sides.length !== this.sides.length) {
      throw new Error('target geometry needs same sides count as start geometry')
    }
  }
  // target geometry is same as this unless specified
  let targetGeometry = options.geometry || input
  // we get the transformation matrices between the connectors
  let m1 = connector.transformationBetweenConnectors(thisConnector, toConnector1, false, 0)
  let m2 = connector.transformationBetweenConnectors(thisConnector, toConnector2, false, 0)
  // we apply the transformations to 3d versions of each point in the 2d shape
  let vps1 = toVec3Pairs(input, m1)
  let vps2 = toVec3Pairs(targetGeometry, m2)

  let polygons = []
  vps1.forEach((vp1, i) => {
    polygons.push(new Polygon3([vps2[i][1], vps2[i][0], vp1[0]]))
    polygons.push(new Polygon3([vps2[i][1], vp1[0], vp1[1]]))
  })
  return polygons
}

module.exports = toWallPolygons
