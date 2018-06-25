const Vector3 = require('../../core/math/Vector3')
const Vertex3 = require('../../core/math/Vertex3')
const {sectionCut, cutByPlane} = require('../ops-cuts')
const {extrudeInOrthonormalBasis} = require('../ops-extrusions/extrusionUtils')
const translate = require('../ops-transformations/translate')
const Polygon3 = require('../../core/math/Polygon3')
const Plane = require('../../core/math/Plane')
const OrthoNormalBasis = require('../../core/math/OrthoNormalBasis')

const {parseOptionAs3DVector, parseOptionAsInt} = require('../optionParsers')
const {defaultResolution3D, EPS} = require('../../core/constants')
const {Connector} = require('../../core/connectors')
const Properties = require('../../core/Properties')
const {fromPolygons} = require('../../core/CSGFactories')

const sphere = require('./spheroid')

// cut the solid at a plane, and stretch the cross-section found along plane normal
// note: only used in roundedCube() internally
const stretchAtPlane = function (csg, normal, point, length) {
  let plane = Plane.fromNormalAndPoint(normal, point)
  let onb = new OrthoNormalBasis(plane)
  let crosssect = sectionCut(csg, onb)
  let midpiece = extrudeInOrthonormalBasis(crosssect, onb, length)
  let piece1 = cutByPlane(csg, plane)
  let piece2 = cutByPlane(csg, plane.flipped())
  let result = piece1.union([midpiece, piece2.translate(plane.normal.times(length))])
  return result
}

/** Construct a cuboid
 * @param {Object} [options] - options for construction
 * @param {Float} [options.size=1] - size of the side of the cuboid : can be either:
 * - a scalar : ie a single float, in which case all dimensions will be the same
 * - or an array: to specify different dimensions along x/y/z
 * @param {Integer} [options.fn=32] - segments of the sphere (ie quality/resolution)
 * @param {Integer} [options.fno=32] - segments of extrusion (ie quality)
 * @param {String} [options.type='normal'] - type of sphere : either 'normal' or 'geodesic'
 * @returns {CSG} new sphere
 *
 * @example
 * let cube1 = cube({
 *   r: 10,
 *   fn: 20
 * })
 */
function cuboid (params) {
  const defaults = {
    size: 1,
    offset: [0, 0, 0],
    round: false,
    radius: 0,
    fn: 8
  }

  let {round, radius, fn, size} = Object.assign({}, defaults, params)
  let offset = [0, 0, 0]
  let v = null
  if (params && params.length) v = params
  if (params && params.size && params.size.length) v = params.size // { size: [1,2,3] }
  if (params && params.size && !params.size.length) size = params.size // { size: 1 }
  if (params && (typeof params !== 'object')) size = params// (2)
  if (params && params.round === true) {
    round = true
    radius = v && v.length ? (v[0] + v[1] + v[2]) / 30 : size / 10
  }
  if (params && params.radius) {
    round = true
    radius = params.radius
  }

  let x = size
  let y = size
  let z = size
  if (v && v.length) {
    [x, y, z] = v
  }
  offset = [x / 2, y / 2, z / 2] // center: false default
  let object = round
    ? _roundedCube({radius: [x / 2, y / 2, z / 2], roundradius: radius, resolution: fn})
    : _cube({radius: [x / 2, y / 2, z / 2]})
  if (params && params.center && params.center.length) {
    offset = [params.center[0] ? 0 : x / 2, params.center[1] ? 0 : y / 2, params.center[2] ? 0 : z / 2]
  } else if (params && params.center === true) {
    offset = [0, 0, 0]
  } else if (params && params.center === false) {
    offset = [x / 2, y / 2, z / 2]
  }
  return (offset[0] || offset[1] || offset[2]) ? translate(offset, object) : object
}

/** Construct an axis-aligned solid cuboid NON API !!!
 * @param {Object} [options] - options for construction
 * @param {Vector3} [options.center=[0,0,0]] - center of cube
 * @param {Vector3} [options.radius=[1,1,1]] - radius of cube, single scalar also possible
 * @returns {CSG} new 3D solid
 *
 * @example
 * let cube = CSG.cube({
 *   center: [5, 5, 5],
 *   radius: 5, // scalar radius
 * });
 */
const _cube = function (options) {
  let c
  let r
  let corner1
  let corner2
  options = options || {}
  if (('corner1' in options) || ('corner2' in options)) {
    if (('center' in options) || ('radius' in options)) {
      throw new Error('cube: should either give a radius and center parameter, or a corner1 and corner2 parameter')
    }
    corner1 = parseOptionAs3DVector(options, 'corner1', [0, 0, 0])
    corner2 = parseOptionAs3DVector(options, 'corner2', [1, 1, 1])
    c = corner1.plus(corner2).times(0.5)
    r = corner2.minus(corner1).times(0.5)
  } else {
    c = parseOptionAs3DVector(options, 'center', [0, 0, 0])
    r = parseOptionAs3DVector(options, 'radius', [1, 1, 1])
  }
  r = r.abs() // negative radii make no sense
  let result = fromPolygons([
    [
            [0, 4, 6, 2],
            [-1, 0, 0]
    ],
    [
            [1, 3, 7, 5],
            [+1, 0, 0]
    ],
    [
            [0, 1, 5, 4],
            [0, -1, 0]
    ],
    [
            [2, 6, 7, 3],
            [0, +1, 0]
    ],
    [
            [0, 2, 3, 1],
            [0, 0, -1]
    ],
    [
            [4, 5, 7, 6],
            [0, 0, +1]
    ]
  ].map(function (info) {
    let vertices = info[0].map(function (i) {
      let pos = new Vector3(
                c.x + r.x * (2 * !!(i & 1) - 1), c.y + r.y * (2 * !!(i & 2) - 1), c.z + r.z * (2 * !!(i & 4) - 1))
      return new Vertex3(pos)
    })
    return new Polygon3(vertices, null /* , plane */)
  }))
  result.properties.cube = new Properties()
  result.properties.cube.center = new Vector3(c)
    // add 6 connectors, at the centers of each face:
  result.properties.cube.facecenters = [
    new Connector(new Vector3([r.x, 0, 0]).plus(c), [1, 0, 0], [0, 0, 1]),
    new Connector(new Vector3([-r.x, 0, 0]).plus(c), [-1, 0, 0], [0, 0, 1]),
    new Connector(new Vector3([0, r.y, 0]).plus(c), [0, 1, 0], [0, 0, 1]),
    new Connector(new Vector3([0, -r.y, 0]).plus(c), [0, -1, 0], [0, 0, 1]),
    new Connector(new Vector3([0, 0, r.z]).plus(c), [0, 0, 1], [1, 0, 0]),
    new Connector(new Vector3([0, 0, -r.z]).plus(c), [0, 0, -1], [1, 0, 0])
  ]
  return result
}

/** Construct an axis-aligned solid rounded cuboid.
 * @param {Object} [options] - options for construction
 * @param {Vector3} [options.center=[0,0,0]] - center of rounded cube
 * @param {Vector3} [options.radius=[1,1,1]] - radius of rounded cube, single scalar is possible
 * @param {Number} [options.roundradius=0.2] - radius of rounded edges
 * @param {Number} [options.resolution=defaultResolution3D] - number of polygons per 360 degree revolution
 * @returns {CSG} new 3D solid
 *
 * @example
 * let cube = CSG.roundedCube({
 *   center: [2, 0, 2],
 *   radius: 15,
 *   roundradius: 2,
 *   resolution: 36,
 * });
 */
const _roundedCube = function (options) {
  let minRR = 1e-2 // minroundradius 1e-3 gives rounding errors already
  let center
  let cuberadius
  let corner1
  let corner2
  options = options || {}
  if (('corner1' in options) || ('corner2' in options)) {
    if (('center' in options) || ('radius' in options)) {
      throw new Error('roundedCube: should either give a radius and center parameter, or a corner1 and corner2 parameter')
    }
    corner1 = parseOptionAs3DVector(options, 'corner1', [0, 0, 0])
    corner2 = parseOptionAs3DVector(options, 'corner2', [1, 1, 1])
    center = corner1.plus(corner2).times(0.5)
    cuberadius = corner2.minus(corner1).times(0.5)
  } else {
    center = parseOptionAs3DVector(options, 'center', [0, 0, 0])
    cuberadius = parseOptionAs3DVector(options, 'radius', [1, 1, 1])
  }
  cuberadius = cuberadius.abs() // negative radii make no sense
  let resolution = parseOptionAsInt(options, 'resolution', defaultResolution3D)
  if (resolution < 4) resolution = 4
  if (resolution % 2 === 1 && resolution < 8) resolution = 8 // avoid ugly
  let roundradius = parseOptionAs3DVector(options, 'roundradius', [0.2, 0.2, 0.2])
    // slight hack for now - total radius stays ok
  roundradius = Vector3.Create(Math.max(roundradius.x, minRR), Math.max(roundradius.y, minRR), Math.max(roundradius.z, minRR))
  let innerradius = cuberadius.minus(roundradius)
  if (innerradius.x < 0 || innerradius.y < 0 || innerradius.z < 0) {
    throw new Error('roundradius <= radius!')
  }
  let res = sphere({radius: 1, resolution: resolution})
  res = res.scale(roundradius)
  innerradius.x > EPS && (res = stretchAtPlane(res, [1, 0, 0], [0, 0, 0], 2 * innerradius.x))
  innerradius.y > EPS && (res = stretchAtPlane(res, [0, 1, 0], [0, 0, 0], 2 * innerradius.y))
  innerradius.z > EPS && (res = stretchAtPlane(res, [0, 0, 1], [0, 0, 0], 2 * innerradius.z))
  res = translate([-innerradius.x + center.x, -innerradius.y + center.y, -innerradius.z + center.z], res)
  res = res.reTesselated()
  res.properties.roundedCube = new Properties()
  res.properties.roundedCube.center = new Vertex3(center)
  res.properties.roundedCube.facecenters = [
    new Connector(new Vector3([cuberadius.x, 0, 0]).plus(center), [1, 0, 0], [0, 0, 1]),
    new Connector(new Vector3([-cuberadius.x, 0, 0]).plus(center), [-1, 0, 0], [0, 0, 1]),
    new Connector(new Vector3([0, cuberadius.y, 0]).plus(center), [0, 1, 0], [0, 0, 1]),
    new Connector(new Vector3([0, -cuberadius.y, 0]).plus(center), [0, -1, 0], [0, 0, 1]),
    new Connector(new Vector3([0, 0, cuberadius.z]).plus(center), [0, 0, 1], [1, 0, 0]),
    new Connector(new Vector3([0, 0, -cuberadius.z]).plus(center), [0, 0, -1], [1, 0, 0])
  ]
  return res
}

module.exports = cuboid
