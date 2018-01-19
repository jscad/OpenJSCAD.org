
/// //////////FUNCTIONAL API
const {CSG} = require('../../csg')
const { circle } = require('./primitives2d-api')
const { rotate_extrude } = require('./ops-extrusions')
const { translate, scale } = require('./ops-transformations')
const Polygon3 = require('../core/math/Polygon3')
const Vector3 = require('../core/math/Vector3')
const Vertex3 = require('../core/math/Vertex3')

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
function cube (params) {
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
    ? CSG.roundedCube({radius: [x / 2, y / 2, z / 2], roundradius: radius, resolution: fn})
    : CSG.cube({radius: [x / 2, y / 2, z / 2]})
  if (params && params.center && params.center.length) {
    offset = [params.center[0] ? 0 : x / 2, params.center[1] ? 0 : y / 2, params.center[2] ? 0 : z / 2]
  } else if (params && params.center === true) {
    offset = [0, 0, 0]
  } else if (params && params.center === false) {
    offset = [x / 2, y / 2, z / 2]
  }
  return (offset[0] || offset[1] || offset[2]) ? translate(offset, object) : object
}

/** Construct a sphere
 * @param {Object} [options] - options for construction
 * @param {Float} [options.r=1] - radius of the sphere
 * @param {Integer} [options.fn=32] - segments of the sphere (ie quality/resolution)
 * @param {Integer} [options.fno=32] - segments of extrusion (ie quality)
 * @param {String} [options.type='normal'] - type of sphere : either 'normal' or 'geodesic'
 * @returns {CSG} new sphere
 *
 * @example
 * let sphere1 = sphere({
 *   r: 10,
 *   fn: 20
 * })
 */
function sphere (params) {
  const defaults = {
    r: 1,
    fn: 32,
    type: 'normal'
  }

  let {r, fn, type} = Object.assign({}, defaults, params)
  let offset = [0, 0, 0] // center: false (default)
  if (params && (typeof params !== 'object')) {
    r = params
  }
  // let zoffset = 0 // sphere() in openscad has no center:true|false

  let output = type === 'geodesic' ? geodesicSphere(params) : CSG.sphere({radius: r, resolution: fn})

  // preparing individual x,y,z center
  if (params && params.center && params.center.length) {
    offset = [params.center[0] ? 0 : r, params.center[1] ? 0 : r, params.center[2] ? 0 : r]
  } else if (params && params.center === true) {
    offset = [0, 0, 0]
  } else if (params && params.center === false) {
    offset = [r, r, r]
  }
  return (offset[0] || offset[1] || offset[2]) ? translate(offset, output) : output
}

function geodesicSphere (params) {
  const defaults = {
    r: 1,
    fn: 5
  }
  let {r, fn} = Object.assign({}, defaults, params)

  let ci = [ // hard-coded data of icosahedron (20 faces, all triangles)
    [0.850651, 0.000000, -0.525731],
    [0.850651, -0.000000, 0.525731],
    [-0.850651, -0.000000, 0.525731],
    [-0.850651, 0.000000, -0.525731],
    [0.000000, -0.525731, 0.850651],
    [0.000000, 0.525731, 0.850651],
    [0.000000, 0.525731, -0.850651],
    [0.000000, -0.525731, -0.850651],
    [-0.525731, -0.850651, -0.000000],
    [0.525731, -0.850651, -0.000000],
    [0.525731, 0.850651, 0.000000],
    [-0.525731, 0.850651, 0.000000]]

  let ti = [ [0, 9, 1], [1, 10, 0], [6, 7, 0], [10, 6, 0], [7, 9, 0], [5, 1, 4], [4, 1, 9], [5, 10, 1], [2, 8, 3], [3, 11, 2], [2, 5, 4],
    [4, 8, 2], [2, 11, 5], [3, 7, 6], [6, 11, 3], [8, 7, 3], [9, 8, 4], [11, 10, 5], [10, 11, 6], [8, 9, 7]]

  let geodesicSubDivide = function (p, fn, offset) {
    let p1 = p[0]
    let p2 = p[1]
    let p3 = p[2]
    let n = offset
    let c = []
    let f = []

    //           p3
    //           /\
    //          /__\     fn = 3
    //      i  /\  /\
    //        /__\/__\       total triangles = 9 (fn*fn)
    //       /\  /\  /\
    //     0/__\/__\/__\
    //    p1 0   j      p2

    for (let i = 0; i < fn; i++) {
      for (let j = 0; j < fn - i; j++) {
        let t0 = i / fn
        let t1 = (i + 1) / fn
        let s0 = j / (fn - i)
        let s1 = (j + 1) / (fn - i)
        let s2 = fn - i - 1 ? j / (fn - i - 1) : 1
        let q = []

        q[0] = mix3(mix3(p1, p2, s0), p3, t0)
        q[1] = mix3(mix3(p1, p2, s1), p3, t0)
        q[2] = mix3(mix3(p1, p2, s2), p3, t1)

        // -- normalize
        for (let k = 0; k < 3; k++) {
          let r = Math.sqrt(q[k][0] * q[k][0] + q[k][1] * q[k][1] + q[k][2] * q[k][2])
          for (let l = 0; l < 3; l++) {
            q[k][l] /= r
          }
        }
        c.push(q[0], q[1], q[2])
        f.push([n, n + 1, n + 2]); n += 3

        if (j < fn - i - 1) {
          let s3 = fn - i - 1 ? (j + 1) / (fn - i - 1) : 1
          q[0] = mix3(mix3(p1, p2, s1), p3, t0)
          q[1] = mix3(mix3(p1, p2, s3), p3, t1)
          q[2] = mix3(mix3(p1, p2, s2), p3, t1)

          // -- normalize
          for (let k = 0; k < 3; k++) {
            let r = Math.sqrt(q[k][0] * q[k][0] + q[k][1] * q[k][1] + q[k][2] * q[k][2])
            for (let l = 0; l < 3; l++) {
              q[k][l] /= r
            }
          }
          c.push(q[0], q[1], q[2])
          f.push([n, n + 1, n + 2]); n += 3
        }
      }
    }
    return { points: c, triangles: f, offset: n }
  }

  const mix3 = function (a, b, f) {
    let _f = 1 - f
    let c = []
    for (let i = 0; i < 3; i++) {
      c[i] = a[i] * _f + b[i] * f
    }
    return c
  }

  if (params) {
    if (params.fn) fn = Math.floor(params.fn / 6)
  }

  if (fn <= 0) fn = 1

  let c = []
  let f = []
  let offset = 0

  for (let i = 0; i < ti.length; i++) {
    let g = geodesicSubDivide([ ci[ti[i][0]], ci[ti[i][1]], ci[ti[i][2]]], fn, offset)
    c = c.concat(g.points)
    f = f.concat(g.triangles)
    offset = g.offset
  }
  return scale(r, polyhedron({points: c, triangles: f}))
}

/** Construct a cylinder
 * @param {Object} [options] - options for construction
 * @param {Float} [options.r=1] - radius of the cylinder
 * @param {Float} [options.r1=1] - radius of the top of the cylinder
 * @param {Float} [options.r2=1] - radius of the bottom of the cylinder
 * @param {Float} [options.d=1] - diameter of the cylinder
 * @param {Float} [options.d1=1] - diameter of the top of the cylinder
 * @param {Float} [options.d2=1] - diameter of the bottom of the cylinder
 * @param {Integer} [options.fn=32] - number of sides of the cylinder (ie quality/resolution)
 * @returns {CSG} new cylinder
 *
 * @example
 * let cylinder = cylinder({
 *   d: 10,
 *   fn: 20
 * })
 */
function cylinder (params) {
  const defaults = {
    r: 1,
    r1: 1,
    r2: 1,
    h: 1,
    fn: 32,
    round: false
  }
  let {r1, r2, h, fn, round} = Object.assign({}, defaults, params)
  let offset = [0, 0, 0]
  let a = arguments
  if (params && params.d) {
    r1 = r2 = params.d / 2
  }
  if (params && params.r) {
    r1 = params.r
    r2 = params.r
  }
  if (params && params.h) {
    h = params.h
  }
  if (params && (params.r1 || params.r2)) {
    r1 = params.r1
    r2 = params.r2
    if (params.h) h = params.h
  }
  if (params && (params.d1 || params.d2)) {
    r1 = params.d1 / 2
    r2 = params.d2 / 2
  }

  if (a && a[0] && a[0].length) {
    a = a[0]
    r1 = a[0]
    r2 = a[1]
    h = a[2]
    if (a.length === 4) fn = a[3]
  }

  let object
  if (params && (params.start && params.end)) {
    object = round
      ? CSG.roundedCylinder({start: params.start, end: params.end, radiusStart: r1, radiusEnd: r2, resolution: fn})
      : CSG.cylinder({start: params.start, end: params.end, radiusStart: r1, radiusEnd: r2, resolution: fn})
  } else {
    object = round
      ? CSG.roundedCylinder({start: [0, 0, 0], end: [0, 0, h], radiusStart: r1, radiusEnd: r2, resolution: fn})
      : CSG.cylinder({start: [0, 0, 0], end: [0, 0, h], radiusStart: r1, radiusEnd: r2, resolution: fn})
    let r = r1 > r2 ? r1 : r2
    if (params && params.center && params.center.length) { // preparing individual x,y,z center
      offset = [params.center[0] ? 0 : r, params.center[1] ? 0 : r, params.center[2] ? -h / 2 : 0]
    } else if (params && params.center === true) {
      offset = [0, 0, -h / 2]
    } else if (params && params.center === false) {
      offset = [0, 0, 0]
    }
    object = (offset[0] || offset[1] || offset[2]) ? translate(offset, object) : object
  }
  return object
}

/** Construct a torus
 * @param {Object} [options] - options for construction
 * @param {Float} [options.ri=1] - radius of base circle
 * @param {Float} [options.ro=4] - radius offset
 * @param {Integer} [options.fni=16] - segments of base circle (ie quality)
 * @param {Integer} [options.fno=32] - segments of extrusion (ie quality)
 * @param {Integer} [options.roti=0] - rotation angle of base circle
 * @returns {CSG} new torus
 *
 * @example
 * let torus1 = torus({
 *   ri: 10
 * })
 */
function torus (params) {
  const defaults = {
    ri: 1,
    ro: 4,
    fni: 16,
    fno: 32,
    roti: 0
  }
  params = Object.assign({}, defaults, params)

  /* possible enhancements ? declarative limits
  const limits = {
    fni: {min: 3},
    fno: {min: 3}
  } */

  let {ri, ro, fni, fno, roti} = params

  if (fni < 3) fni = 3
  if (fno < 3) fno = 3

  let baseCircle = circle({r: ri, fn: fni, center: true})

  if (roti) baseCircle = baseCircle.rotateZ(roti)
  let result = rotate_extrude({fn: fno}, translate([ro, 0, 0], baseCircle))
  // result = result.union(result)
  return result
}

/** Construct a polyhedron from the given triangles/ polygons/points
 * @param {Object} [options] - options for construction
 * @param {Array} [options.triangles] - triangles to build the polyhedron from
 * @param {Array} [options.polygons] - polygons to build the polyhedron from
 * @param {Array} [options.points] - points to build the polyhedron from
 * @param {Array} [options.colors] - colors to apply to the polyhedron
 * @returns {CSG} new polyhedron
 *
 * @example
 * let torus1 = polyhedron({
 *   points: [...]
 * })
 */
function polyhedron (params) {
  let pgs = []
  let ref = params.triangles || params.polygons
  let colors = params.colors || null

  for (let i = 0; i < ref.length; i++) {
    let pp = []
    for (let j = 0; j < ref[i].length; j++) {
      pp[j] = params.points[ref[i][j]]
    }

    let v = []
    for (let j = ref[i].length - 1; j >= 0; j--) { // --- we reverse order for examples of OpenSCAD work
      v.push(new Vertex3(new Vector3(pp[j][0], pp[j][1], pp[j][2])))
    }
    let s = Polygon3.defaultShared
    if (colors && colors[i]) {
      s = Polygon3.Shared.fromColor(colors[i])
    }
    pgs.push(new Polygon3(v, s))
  }

  // forced to import here, otherwise out of order imports mess things up
  const {fromPolygons} = require('../core/CSGFactories')
  return fromPolygons(pgs)
}

module.exports = {
  cube,
  sphere,
  cylinder,
  geodesicSphere,
  torus,
  polyhedron
}
