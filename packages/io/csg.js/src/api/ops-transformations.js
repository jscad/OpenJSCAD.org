const Matrix4 = require('../core/math/Matrix4')
const Plane = require('../core/math/Plane')
const Vector3 = require('../core/math/Vector3')
const { union } = require('./ops-booleans')
const { fromPoints } = require('../core/CAGFactories')
const { isCAG } = require('../core/utils')
// -- 3D transformations (OpenSCAD like notion)

/** translate an object in 2D/3D space
 * @param {Object} vector - 3D vector to translate the given object(s) by
 * @param {Object(s)|Array} objects either a single or multiple CSG/CAG objects to translate
 * @returns {CSG} new CSG object , translated by the given amount
 *
 * @example
 * let movedSphere = translate([10,2,0], sphere())
 */
function translate (vector, ...objects) {      // v, obj or array
  // workaround needed to determine if we are dealing with an array of objects
  const _objects = (objects.length >= 1 && objects[0].length) ? objects[0] : objects
  let object = _objects[0]

  if (_objects.length > 1) {
    for (let i = 1; i < _objects.length; i++) { // FIXME/ why is union really needed ??
      object = object.union(_objects[i])
    }
  }
  return object.translate(vector)
}

/** scale an object in 2D/3D space
 * @param {Float|Array} scale - either an array or simple number to scale object(s) by
 * @param {Object(s)|Array} objects either a single or multiple CSG/CAG objects to scale
 * @returns {CSG} new CSG object , scaled by the given amount
 *
 * @example
 * let scaledSphere = scale([0.2,15,1], sphere())
 */
function scale (scale, ...objects) {         // v, obj or array
  const _objects = (objects.length >= 1 && objects[0].length) ? objects[0] : objects
  let object = _objects[0]

  if (_objects.length > 1) {
    for (let i = 1; i < _objects.length; i++) { // FIXME/ why is union really needed ??
      object = object.union(_objects[i])
    }
  }
  return object.scale(scale)
}

/** rotate an object in 2D/3D space
 * @param {Float|Array} rotation - either an array or simple number to rotate object(s) by
 * @param {Object(s)|Array} objects either a single or multiple CSG/CAG objects to rotate
 * @returns {CSG} new CSG object , rotated by the given amount
 *
 * @example
 * let rotatedSphere = rotate([0.2,15,1], sphere())
 */
function rotate () {
  let o
  let i
  let v
  let r = 1
  let a = arguments
  if (!a[0].length) {        // rotate(r,[x,y,z],o)
    r = a[0]
    v = a[1]
    i = 2
    if (a[2].length) { a = a[2]; i = 0 }
  } else {                   // rotate([x,y,z],o)
    v = a[0]
    i = 1
    if (a[1].length) { a = a[1]; i = 0 }
  }
  for (o = a[i++]; i < a.length; i++) {
    o = o.union(a[i])
  }
  if (r !== 1) {
    return o.rotate([0, 0, 0], v, r)
  } else {
    return o.rotateX(v[0]).rotateY(v[1]).rotateZ(v[2])
  }
}

/** apply the given matrix transform to the given objects
 * @param {Array} matrix - the 4x4 matrix to apply, as a simple 1d array of 16 elements
 * @param {Object(s)|Array} objects either a single or multiple CSG/CAG objects to transform
 * @returns {CSG} new CSG object , transformed
 *
 * @example
 * const angle = 45
 * let transformedShape = transform([
 * cos(angle), -sin(angle), 0, 10,
 * sin(angle),  cos(angle), 0, 20,
 * 0         ,           0, 1, 30,
 * 0,           0, 0,  1
 * ], sphere())
 */
function transform (matrix, ...objects) { // v, obj or array
  const _objects = (objects.length >= 1 && objects[0].length) ? objects[0] : objects
  let object = _objects[0]

  if (_objects.length > 1) {
    for (let i = 1; i < _objects.length; i++) { // FIXME/ why is union really needed ??
      object = object.union(_objects[i])
    }
  }

  let transformationMatrix
  if (!Array.isArray(matrix)) {
    throw new Error('Matrix needs to be an array')
  }
  matrix.forEach(element => {
    if (!Number.isFinite(element)) {
      throw new Error('you can only use a flat array of valid, finite numbers (float and integers)')
    }
  })
  transformationMatrix = new Matrix4(matrix)
  return object.transform(transformationMatrix)
}


/**
 * Center the given object(s) about the given axes
 * @param {Array|Boolean} axes=[true,true,true]|true  - an array of boolean values that indicate the axes (X,Y,Z) to center upon. A single boolean is also allowed.
 * @param {...Object} object one or more objects to center, i.e. objects are CSG or CAG
 * @returns {CSG} new CSG object , translated by the given amount
 *
 * @example
 * let csg = center([true,false,false], sphere()) // center about the X axis
 */
function center (axes, ...objects) {
  const _objects = (objects.length >= 1 && objects[0].length) ? objects[0] : objects
  let object = _objects[0]

  if (_objects.length > 1) {
    for (let i = 1; i < _objects.length; i++) { // FIXME/ why is union really needed ??
      object = object.union(_objects[i])
    }
  }
  if (! Array.isArray(axes)) {
    axes = [axes,axes,axes]
  }
  return object.center(axes)
}

/** mirror an object in 2D/3D space
 * @param {Array} vector - the axes to mirror the object(s) by
 * @param {Object(s)|Array} objects either a single or multiple CSG/CAG objects to mirror
 * @returns {CSG} new CSG object , mirrored
 *
 * @example
 * let rotatedSphere = mirror([0.2,15,1], sphere())
 */
function mirror (vector, ...objects) {
  const _objects = (objects.length >= 1 && objects[0].length) ? objects[0] : objects
  let object = _objects[0]

  if (_objects.length > 1) {
    for (let i = 1; i < _objects.length; i++) { // FIXME/ why is union really needed ??
      object = object.union(_objects[i])
    }
  }
  const plane = new Plane(new Vector3(vector[0], vector[1], vector[2]).unit(), 0)
  return object.mirrored(plane)
}

/** expand an object in 2D/3D space
 * @param {float} radius - the radius to expand by
 * @param {Object} object a CSG/CAG objects to expand
 * @returns {CSG/CAG} new CSG/CAG object , expanded
 *
 * @example
 * let expanededShape = expand([0.2,15,1], sphere())
 */
function expand (radius, n, object) {
  return object.expand(radius, n)
}

/** contract an object(s) in 2D/3D space
 * @param {float} radius - the radius to contract by
 * @param {Object} object a CSG/CAG objects to contract
 * @returns {CSG/CAG} new CSG/CAG object , contracted
 *
 * @example
 * let contractedShape = contract([0.2,15,1], sphere())
 */
function contract (radius, n, object) {
  return object.contract(radius, n)
}

/** create a minkowski sum of the given shapes
 * @param {Object(s)|Array} objects either a single or multiple CSG/CAG objects to create a hull around
 * @returns {CSG} new CSG object , mirrored
 *
 * @example
 * let hulled = hull(rect(), circle())
 */
function minkowski () {
  console.log('minkowski() not yet implemented')
}

/** create a convex hull of the given shapes
 * @param {Object(s)|Array} objects either a single or multiple CSG/CAG objects to create a hull around
 * @returns {CSG} new CSG object , a hull around the given shapes
 *
 * @example
 * let hulled = hull(rect(), circle())
 */
function hull () {
  let pts = []

  let a = arguments
  if (a[0].length) a = a[0]
  let done = []

  for (let i = 0; i < a.length; i++) {              // extract all points of the CAG in the argument list
    let cag = a[i]
    if (!isCAG(cag)) {
      throw new Error('ERROR: hull() accepts only 2D forms / CAG')
    }
    for (let j = 0; j < cag.sides.length; j++) {
      let x = cag.sides[j].vertex0.pos.x
      let y = cag.sides[j].vertex0.pos.y
      // avoid some coord to appear multiple times
      if (done['' + x + ',' + y]) {
        continue
      }
      pts.push({ x: x, y: y })
      done['' + x + ',' + y]++
         // echo(x,y);
    }
  }
   // echo(pts.length+" points in",pts);

   // from http://www.psychedelicdevelopment.com/grahamscan/
   //    see also at https://github.com/bkiers/GrahamScan/blob/master/src/main/cg/GrahamScan.java
  let ConvexHullPoint = function (i, a, d) {
    this.index = i
    this.angle = a
    this.distance = d

    this.compare = function (p) {
      if (this.angle < p.angle) {
        return -1
      } else if (this.angle > p.angle) {
        return 1
      } else {
        if (this.distance < p.distance) {
          return -1
        } else if (this.distance > p.distance) {
          return 1
        }
      }
      return 0
    }
  }

  let ConvexHull = function () {
    this.points = null
    this.indices = null

    this.getIndices = function () {
      return this.indices
    }

    this.clear = function () {
      this.indices = null
      this.points = null
    }

    this.ccw = function (p1, p2, p3) {
      let ccw = (this.points[p2].x - this.points[p1].x) * (this.points[p3].y - this.points[p1].y) -
                   (this.points[p2].y - this.points[p1].y) * (this.points[p3].x - this.points[p1].x)
      // we need this, otherwise sorting never ends, see https://github.com/Spiritdude/OpenJSCAD.org/issues/18
      if (ccw < 1e-5) {
        return 0
      }
      return ccw
    }

    this.angle = function (o, a) {
         // return Math.atan((this.points[a].y-this.points[o].y) / (this.points[a].x - this.points[o].x));
      return Math.atan2((this.points[a].y - this.points[o].y), (this.points[a].x - this.points[o].x))
    }

    this.distance = function (a, b) {
      return ((this.points[b].x - this.points[a].x) * (this.points[b].x - this.points[a].x) +
                 (this.points[b].y - this.points[a].y) * (this.points[b].y - this.points[a].y))
    }

    this.compute = function (_points) {
      this.indices = null
      if (_points.length < 3) {
        return
      }
      this.points = _points

         // Find the lowest point
      let min = 0
      for (let i = 1; i < this.points.length; i++) {
        if (this.points[i].y === this.points[min].y) {
          if (this.points[i].x < this.points[min].x) {
            min = i
          }
        } else if (this.points[i].y < this.points[min].y) {
          min = i
        }
      }

         // Calculate angle and distance from base
      let al = []
      let ang = 0.0
      let dist = 0.0
      for (let i = 0; i < this.points.length; i++) {
        if (i === min) {
          continue
        }
        ang = this.angle(min, i)
        if (ang < 0) {
          ang += Math.PI
        }
        dist = this.distance(min, i)
        al.push(new ConvexHullPoint(i, ang, dist))
      }

      al.sort(function (a, b) { return a.compare(b) })

         // Create stack
      let stack = new Array(this.points.length + 1)
      let j = 2
      for (let i = 0; i < this.points.length; i++) {
        if (i === min) {
          continue
        }
        stack[j] = al[j - 2].index
        j++
      }
      stack[0] = stack[this.points.length]
      stack[1] = min

      let tmp
      let M = 2
      for (let i = 3; i <= this.points.length; i++) {
        while (this.ccw(stack[M - 1], stack[M], stack[i]) <= 0) {
          M--
        }
        M++
        tmp = stack[i]
        stack[i] = stack[M]
        stack[M] = tmp
      }

      this.indices = new Array(M)
      for (let i = 0; i < M; i++) {
        this.indices[i] = stack[i + 1]
      }
    }
  }

  let hull = new ConvexHull()

  hull.compute(pts)
  let indices = hull.getIndices()

  if (indices && indices.length > 0) {
    let ch = []
    for (let i = 0; i < indices.length; i++) {
      ch.push(pts[indices[i]])
    }
    return fromPoints(ch)
  }
}

/** create a chain hull of the given shapes
 * Originally "Whosa whatsis" suggested "Chain Hull" ,
 * as described at https://plus.google.com/u/0/105535247347788377245/posts/aZGXKFX1ACN
 * essentially hull A+B, B+C, C+D and then union those
 * @param {Object(s)|Array} objects either a single or multiple CSG/CAG objects to create a chain hull around
 * @returns {CSG} new CSG object ,which a chain hull of the inputs
 *
 * @example
 * let hulled = chain_hull(rect(), circle())
 */
function chain_hull (params, objects) {
  /*
  const defaults = {
    closed: false
  }
  const closed = Object.assign({}, defaults, params) */
  let a = arguments
  let closed = false
  let j = 0

  if (a[j].closed !== undefined) {
    closed = a[j++].closed
  }

  if (a[j].length) { a = a[j] }

  let hulls = []
  let hullsAmount = a.length - (closed ? 0 : 1)
  for (let i = 0; i < hullsAmount; i++) {
    hulls.push(hull(a[i], a[(i + 1) % a.length]))
  }
  return union(hulls)
}

module.exports = {
  translate,
  center,
  scale,
  rotate,
  transform,
  mirror,
  expand,
  contract,
  minkowski,
  hull,
  chain_hull
}
