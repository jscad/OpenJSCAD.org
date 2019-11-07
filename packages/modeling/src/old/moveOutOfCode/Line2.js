const Vector2D = require('./Vector2')
const {solve2Linear} = require('../utils')

/**  class Line2D
 * Represents a directional line in 2D space
 * A line is parametrized by its normal vector (perpendicular to the line, rotated 90 degrees counter clockwise)
 * and w. The line passes through the point <normal>.times(w).
 * Equation: p is on line if normal.dot(p)==w
 * @param {Vector2D} normal normal must be a unit vector!
 * @returns {Line2D}
*/
const Line2D = function (normal, w) {
  normal = new Vector2D(normal)
  w = parseFloat(w)
  let l = normal.length()
    // normalize:
  w *= l
  normal = normal.times(1.0 / l)
  this.normal = normal
  this.w = w
}

Line2D.fromPoints = function (p1, p2) {
  p1 = new Vector2D(p1)
  p2 = new Vector2D(p2)
  let direction = p2.minus(p1)
  let normal = direction.normal().negated().unit()
  let w = p1.dot(normal)
  return new Line2D(normal, w)
}

Line2D.prototype = {
    // same line but opposite direction:
  reverse: function () {
    return new Line2D(this.normal.negated(), -this.w)
  },

  equals: function (l) {
    return (l.normal.equals(this.normal) && (l.w === this.w))
  },

  origin: function () {
    return this.normal.times(this.w)
  },

  direction: function () {
    return this.normal.normal()
  },

  xAtY: function (y) {
        // (py == y) && (normal * p == w)
        // -> px = (w - normal._y * y) / normal.x
    let x = (this.w - this.normal._y * y) / this.normal.x
    return x
  },

  absDistanceToPoint: function (point) {
    point = new Vector2D(point)
    let pointProjected = point.dot(this.normal)
    let distance = Math.abs(pointProjected - this.w)
    return distance
  },
    /* FIXME: has error - origin is not defined, the method is never used
     closestPoint: function(point) {
         point = new Vector2D(point);
         let vector = point.dot(this.direction());
         return origin.plus(vector);
     },
     */

    // intersection between two lines, returns point as Vector2D
  intersectWithLine: function (line2d) {
    let point = solve2Linear(this.normal.x, this.normal.y, line2d.normal.x, line2d.normal.y, this.w, line2d.w)
    point = new Vector2D(point) // make  vector2d
    return point
  },

  transform: function (matrix4x4) {
    let origin = new Vector2D(0, 0)
    let pointOnPlane = this.normal.times(this.w)
    let neworigin = origin.multiply4x4(matrix4x4)
    let neworiginPlusNormal = this.normal.multiply4x4(matrix4x4)
    let newnormal = neworiginPlusNormal.minus(neworigin)
    let newpointOnPlane = pointOnPlane.multiply4x4(matrix4x4)
    let neww = newnormal.dot(newpointOnPlane)
    return new Line2D(newnormal, neww)
  }
}

module.exports = Line2D
