const vec2 = require('../../math/vec2')
const vec3 = require('../../math/vec3')
const measureBounds = require('./measureBounds')

const fromPolygons = require('../geom3/fromPolygons')
const toGeom3Wall = require('./toGeom3Wall')

const connector = require('../../connector')

/** convert a 2d geometry to a set of plane polygons,
 * by intersecting the outlines of the 2d geometry with a simple plane (a quad)
 * @param  {Geom2} geometry
 * @param  {Object} options
 * @return {Array<Poly3>} polygons
 */
const toPlanePolygons = (geometry, options) => {
  const defaults = {
    flipped: false,
    origin: [0, 0, 0],
    normal: [0, 1, 0],
    axis: [0, 0, 1]
  }
  options = Object.assign({}, defaults, options)
  let { flipped, normal, axis, origin } = options
  // reference connector for transformation
  let fromConnector = connector.fromPointAxisNormal(defaults.origin, defaults.axis, defaults.normal)
  // offset origin of connector per options
  // will override above if options has toConnector
  let toConnector = options.toConnector || connector.fromPointAxisNormal(origin, axis, normal)
  // resulting transform
  let matrix = connector.transformationBetweenConnectors({ mirror: false, normalrotation: 0 }, fromConnector, toConnector)
  // create plane as a (partial non-closed) Geom3 in XY plane, fit to size (using bounds size)
  const bounds = measureBounds(geometry)
  const expandedBounds = [
    vec2.subtract(bounds[0], [1, 1]),
    vec2.add(bounds[1], [1, 1])
  ]

  let shellGeom = toGeom3Wall(geometry, -1, 1)
  let planeGeom = fromPolygons([[
    vec3.fromValues(bounds[0][0], bounds[0][1], 0),
    vec3.fromValues(bounds[1][0], bounds[1][1], 0),
    vec3.fromValues(bounds[1][0], bounds[1][1], 0),
    vec3.fromValues(bounds[0][0], bounds[1][1], 0)
  ]])
  if (flipped) {
    planeGeom = planeGeom.invert()
  }
  // we do the intersection of the plane with the shell to get an outline on the plane
  planeGeom = intersectSub(planeGeom, shellGeom) // intersectSub -> prevent premature retesselate/canonicalize
  // only keep the polygons in the z plane:
  let polys = planeGeom.polygons.filter(polygon => Math.abs(polygon.plane.normal.z) > 0.99)
  // finally, position the plane per passed transformations
  return polys.map(poly => poly.transform(matrix))
}

module.exports = toPlanePolygons
