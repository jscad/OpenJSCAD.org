const Vector2D = require('./Vector2')
const {EPS, angleEPS} = require('../constants')
const {parseOptionAs2DVector, parseOptionAsFloat, parseOptionAsInt, parseOptionAsBool} = require('../optionParsers')
const {defaultResolution2D} = require('../constants')
const Vertex = require('./Vertex2')
const Side = require('./Side')

/** Class Path2D
 * Represents a series of points, connected by infinitely thin lines.
 * A path can be open or closed, i.e. additional line between first and last points. 
 * The difference between Path2D and CAG is that a path is a 'thin' line, whereas a CAG is an enclosed area. 
 * @constructor
 * @param {Vector2D[]} [points=[]] - list of points
 * @param {boolean} [closed=false] - closer of path
 *
 * @example
 * new CSG.Path2D()
 * new CSG.Path2D([[10,10], [-10,10], [-10,-10], [10,-10]], true) // closed
 */
const Path2D = function (points, closed) {
  closed = !!closed
  points = points || []
    // re-parse the points into Vector2D
    // and remove any duplicate points
  let prevpoint = null
  if (closed && (points.length > 0)) {
    prevpoint = new Vector2D(points[points.length - 1])
  }
  let newpoints = []
  points.map(function (point) {
    point = new Vector2D(point)
    let skip = false
    if (prevpoint !== null) {
      let distance = point.distanceTo(prevpoint)
      skip = distance < EPS
    }
    if (!skip) newpoints.push(point)
    prevpoint = point
  })
  this.points = newpoints
  this.closed = closed
}

/** Construct an arc.
 * @param {Object} [options] - options for construction
 * @param {Vector2D} [options.center=[0,0]] - center of circle
 * @param {Number} [options.radius=1] - radius of circle
 * @param {Number} [options.startangle=0] - starting angle of the arc, in degrees
 * @param {Number} [options.endangle=360] - ending angle of the arc, in degrees
 * @param {Number} [options.resolution=defaultResolution2D] - number of sides per 360 rotation
 * @param {Boolean} [options.maketangent=false] - adds line segments at both ends of the arc to ensure that the gradients at the edges are tangent
 * @returns {Path2D} new Path2D object (not closed)
 *
 * @example
 * let path = CSG.Path2D.arc({
 *   center: [5, 5],
 *   radius: 10,
 *   startangle: 90,
 *   endangle: 180,
 *   resolution: 36,
 *   maketangent: true
 * });
 */
Path2D.arc = function (options) {
  let center = parseOptionAs2DVector(options, 'center', 0)
  let radius = parseOptionAsFloat(options, 'radius', 1)
  let startangle = parseOptionAsFloat(options, 'startangle', 0)
  let endangle = parseOptionAsFloat(options, 'endangle', 360)
  let resolution = parseOptionAsInt(options, 'resolution', defaultResolution2D)
  let maketangent = parseOptionAsBool(options, 'maketangent', false)
    // no need to make multiple turns:
  while (endangle - startangle >= 720) {
    endangle -= 360
  }
  while (endangle - startangle <= -720) {
    endangle += 360
  }
  let points = []
  let point
  let absangledif = Math.abs(endangle - startangle)
  if (absangledif < angleEPS) {
    point = Vector2D.fromAngle(startangle / 180.0 * Math.PI).times(radius)
    points.push(point.plus(center))
  } else {
    let numsteps = Math.floor(resolution * absangledif / 360) + 1
    let edgestepsize = numsteps * 0.5 / absangledif // step size for half a degree
    if (edgestepsize > 0.25) edgestepsize = 0.25
    let numstepsMod = maketangent ? (numsteps + 2) : numsteps
    for (let i = 0; i <= numstepsMod; i++) {
      let step = i
      if (maketangent) {
        step = (i - 1) * (numsteps - 2 * edgestepsize) / numsteps + edgestepsize
        if (step < 0) step = 0
        if (step > numsteps) step = numsteps
      }
      let angle = startangle + step * (endangle - startangle) / numsteps
      point = Vector2D.fromAngle(angle / 180.0 * Math.PI).times(radius)
      points.push(point.plus(center))
    }
  }
  return new Path2D(points, false)
}

Path2D.prototype = {
  concat: function (otherpath) {
    if (this.closed || otherpath.closed) {
      throw new Error('Paths must not be closed')
    }
    let newpoints = this.points.concat(otherpath.points)
    return new Path2D(newpoints)
  },

  /**
   * Get the points that make up the path.
   * note that this is current internal list of points, not an immutable copy.
   * @returns {Vector2[]} array of points the make up the path
   */
  getPoints: function() {
    return this.points;
  },

  /**
   * Append an point to the end of the path.
   * @param {Vector2D} point - point to append
   * @returns {Path2D} new Path2D object (not closed)
   */
  appendPoint: function (point) {
    if (this.closed) {
      throw new Error('Path must not be closed')
    }
    point = new Vector2D(point) // cast to Vector2D
    let newpoints = this.points.concat([point])
    return new Path2D(newpoints)
  },

  /**
   * Append a list of points to the end of the path.
   * @param {Vector2D[]} points - points to append
   * @returns {Path2D} new Path2D object (not closed)
   */
  appendPoints: function (points) {
    if (this.closed) {
      throw new Error('Path must not be closed')
    }
    let newpoints = this.points
    points.forEach(function (point) {
      newpoints.push(new Vector2D(point)) // cast to Vector2D
    })
    return new Path2D(newpoints)
  },

  close: function () {
    return new Path2D(this.points, true)
  },

  /**
   * Determine if the path is a closed or not.
   * @returns {Boolean} true when the path is closed, otherwise false
   */
  isClosed: function() {
    return this.closed
  },

    // Extrude the path by following it with a rectangle (upright, perpendicular to the path direction)
    // Returns a CSG solid
    //   width: width of the extrusion, in the z=0 plane
    //   height: height of the extrusion in the z direction
    //   resolution: number of segments per 360 degrees for the curve in a corner
  rectangularExtrude: function (width, height, resolution) {
    let cag = this.expandToCAG(width / 2, resolution)
    let result = cag.extrude({
      offset: [0, 0, height]
    })
    return result
  },

    // Expand the path to a CAG
    // This traces the path with a circle with radius pathradius
  expandToCAG: function (pathradius, resolution) {
    const CAG = require('../CAG') // FIXME: cyclic dependencies CAG => PATH2 => CAG
    let sides = []
    let numpoints = this.points.length
    let startindex = 0
    if (this.closed && (numpoints > 2)) startindex = -1
    let prevvertex
    for (let i = startindex; i < numpoints; i++) {
      let pointindex = i
      if (pointindex < 0) pointindex = numpoints - 1
      let point = this.points[pointindex]
      let vertex = new Vertex(point)
      if (i > startindex) {
        let side = new Side(prevvertex, vertex)
        sides.push(side)
      }
      prevvertex = vertex
    }
    let shellcag = CAG.fromSides(sides)
    let expanded = shellcag.expandedShell(pathradius, resolution)
    return expanded
  },

  innerToCAG: function() {
    const CAG = require('../CAG') // FIXME: cyclic dependencies CAG => PATH2 => CAG
    if (!this.closed) throw new Error("The path should be closed!");
    return CAG.fromPoints(this.points);
  },

  transform: function (matrix4x4) {
    let newpoints = this.points.map(function (point) {
      return point.multiply4x4(matrix4x4)
    })
    return new Path2D(newpoints, this.closed)
  },

  /**
   * Append a Bezier curve to the end of the path, using the control points to transition the curve through start and end points.
   * <br>
   * The Bézier curve starts at the last point in the path,
   * and ends at the last given control point. Other control points are intermediate control points.
   * <br>
   * The first control point may be null to ensure a smooth transition occurs. In this case,  
   * the second to last control point of the path is mirrored into the control points of the Bezier curve.
   * In other words, the trailing gradient of the path matches the new gradient of the curve. 
   * @param {Vector2D[]} controlpoints - list of control points
   * @param {Object} [options] - options for construction
   * @param {Number} [options.resolution=defaultResolution2D] - number of sides per 360 rotation
   * @returns {Path2D} new Path2D object (not closed)
   *
   * @example
   * let p5 = new CSG.Path2D([[10,-20]],false);
   * p5 = p5.appendBezier([[10,-10],[25,-10],[25,-20]]);
   * p5 = p5.appendBezier([[25,-30],[40,-30],[40,-20]]);
   */
  appendBezier: function (controlpoints, options) {
    if (arguments.length < 2) {
      options = {}
    }
    if (this.closed) {
      throw new Error('Path must not be closed')
    }
    if (!(controlpoints instanceof Array)) {
      throw new Error('appendBezier: should pass an array of control points')
    }
    if (controlpoints.length < 1) {
      throw new Error('appendBezier: need at least 1 control point')
    }
    if (this.points.length < 1) {
      throw new Error('appendBezier: path must already contain a point (the endpoint of the path is used as the starting point for the bezier curve)')
    }
    let resolution = parseOptionAsInt(options, 'resolution', defaultResolution2D)
    if (resolution < 4) resolution = 4
    let factorials = []
    let controlpointsParsed = []
    controlpointsParsed.push(this.points[this.points.length - 1]) // start at the previous end point
    for (let i = 0; i < controlpoints.length; ++i) {
      let p = controlpoints[i]
      if (p === null) {
                // we can pass null as the first control point. In that case a smooth gradient is ensured:
        if (i !== 0) {
          throw new Error('appendBezier: null can only be passed as the first control point')
        }
        if (controlpoints.length < 2) {
          throw new Error('appendBezier: null can only be passed if there is at least one more control point')
        }
        let lastBezierControlPoint
        if ('lastBezierControlPoint' in this) {
          lastBezierControlPoint = this.lastBezierControlPoint
        } else {
          if (this.points.length < 2) {
            throw new Error('appendBezier: null is passed as a control point but this requires a previous bezier curve or at least two points in the existing path')
          }
          lastBezierControlPoint = this.points[this.points.length - 2]
        }
                // mirror the last bezier control point:
        p = this.points[this.points.length - 1].times(2).minus(lastBezierControlPoint)
      } else {
        p = new Vector2D(p) // cast to Vector2D
      }
      controlpointsParsed.push(p)
    }
    let bezierOrder = controlpointsParsed.length - 1
    let fact = 1
    for (let i = 0; i <= bezierOrder; ++i) {
      if (i > 0) fact *= i
      factorials.push(fact)
    }
    let binomials = []
    for (let i = 0; i <= bezierOrder; ++i) {
      let binomial = factorials[bezierOrder] / (factorials[i] * factorials[bezierOrder - i])
      binomials.push(binomial)
    }
    let getPointForT = function (t) {
      let t_k = 1 // = pow(t,k)
      let one_minus_t_n_minus_k = Math.pow(1 - t, bezierOrder) // = pow( 1-t, bezierOrder - k)
      let inv_1_minus_t = (t !== 1) ? (1 / (1 - t)) : 1
      let point = new Vector2D(0, 0)
      for (let k = 0; k <= bezierOrder; ++k) {
        if (k === bezierOrder) one_minus_t_n_minus_k = 1
        let bernstein_coefficient = binomials[k] * t_k * one_minus_t_n_minus_k
        point = point.plus(controlpointsParsed[k].times(bernstein_coefficient))
        t_k *= t
        one_minus_t_n_minus_k *= inv_1_minus_t
      }
      return point
    }
    let newpoints = []
    let newpoints_t = []
    let numsteps = bezierOrder + 1
    for (let i = 0; i < numsteps; ++i) {
      let t = i / (numsteps - 1)
      let point = getPointForT(t)
      newpoints.push(point)
      newpoints_t.push(t)
    }
    // subdivide each segment until the angle at each vertex becomes small enough:
    let subdivideBase = 1
    let maxangle = Math.PI * 2 / resolution // segments may have differ no more in angle than this
    let maxsinangle = Math.sin(maxangle)
    while (subdivideBase < newpoints.length - 1) {
      let dir1 = newpoints[subdivideBase].minus(newpoints[subdivideBase - 1]).unit()
      let dir2 = newpoints[subdivideBase + 1].minus(newpoints[subdivideBase]).unit()
      let sinangle = dir1.cross(dir2) // this is the sine of the angle
      if (Math.abs(sinangle) > maxsinangle) {
                // angle is too big, we need to subdivide
        let t0 = newpoints_t[subdivideBase - 1]
        let t1 = newpoints_t[subdivideBase + 1]
        let t0_new = t0 + (t1 - t0) * 1 / 3
        let t1_new = t0 + (t1 - t0) * 2 / 3
        let point0_new = getPointForT(t0_new)
        let point1_new = getPointForT(t1_new)
                // remove the point at subdivideBase and replace with 2 new points:
        newpoints.splice(subdivideBase, 1, point0_new, point1_new)
        newpoints_t.splice(subdivideBase, 1, t0_new, t1_new)
                // re - evaluate the angles, starting at the previous junction since it has changed:
        subdivideBase--
        if (subdivideBase < 1) subdivideBase = 1
      } else {
        ++subdivideBase
      }
    }
        // append to the previous points, but skip the first new point because it is identical to the last point:
    newpoints = this.points.concat(newpoints.slice(1))
    let result = new Path2D(newpoints)
    result.lastBezierControlPoint = controlpointsParsed[controlpointsParsed.length - 2]
    return result
  },


  /**
   * Append an arc to the end of the path.
   * This implementation follows the SVG arc specs. For the details see
   * http://www.w3.org/TR/SVG/paths.html#PathDataEllipticalArcCommands
   * @param {Vector2D} endpoint - end point of arc
   * @param {Object} [options] - options for construction
   * @param {Number} [options.radius=0] - radius of arc (X and Y), see also xradius and yradius
   * @param {Number} [options.xradius=0] - X radius of arc, see also radius
   * @param {Number} [options.yradius=0] - Y radius of arc, see also radius
   * @param {Number} [options.xaxisrotation=0] -  rotation (in degrees) of the X axis of the arc with respect to the X axis of the coordinate system
   * @param {Number} [options.resolution=defaultResolution2D] - number of sides per 360 rotation
   * @param {Boolean} [options.clockwise=false] - draw an arc clockwise with respect to the center point
   * @param {Boolean} [options.large=false] - draw an arc longer than 180 degrees
   * @returns {Path2D} new Path2D object (not closed)
   *
   * @example
   * let p1 = new CSG.Path2D([[27.5,-22.96875]],false);
   * p1 = p1.appendPoint([27.5,-3.28125]);
   * p1 = p1.appendArc([12.5,-22.96875],{xradius: 15,yradius: -19.6875,xaxisrotation: 0,clockwise: false,large: false});
   * p1 = p1.close();
   */
  appendArc: function (endpoint, options) {
    let decimals = 100000
    if (arguments.length < 2) {
      options = {}
    }
    if (this.closed) {
      throw new Error('Path must not be closed')
    }
    if (this.points.length < 1) {
      throw new Error('appendArc: path must already contain a point (the endpoint of the path is used as the starting point for the arc)')
    }
    let resolution = parseOptionAsInt(options, 'resolution', defaultResolution2D)
    if (resolution < 4) resolution = 4
    let xradius, yradius
    if (('xradius' in options) || ('yradius' in options)) {
      if ('radius' in options) {
        throw new Error('Should either give an xradius and yradius parameter, or a radius parameter')
      }
      xradius = parseOptionAsFloat(options, 'xradius', 0)
      yradius = parseOptionAsFloat(options, 'yradius', 0)
    } else {
      xradius = parseOptionAsFloat(options, 'radius', 0)
      yradius = xradius
    }
    let xaxisrotation = parseOptionAsFloat(options, 'xaxisrotation', 0)
    let clockwise = parseOptionAsBool(options, 'clockwise', false)
    let largearc = parseOptionAsBool(options, 'large', false)
    let startpoint = this.points[this.points.length - 1]
    endpoint = new Vector2D(endpoint)
        // round to precision in order to have determinate calculations
    xradius = Math.round(xradius * decimals) / decimals
    yradius = Math.round(yradius * decimals) / decimals
    endpoint = new Vector2D(Math.round(endpoint.x * decimals) / decimals, Math.round(endpoint.y * decimals) / decimals)

    let sweepFlag = !clockwise
    let newpoints = []
    if ((xradius === 0) || (yradius === 0)) {
            // http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes:
            // If rx = 0 or ry = 0, then treat this as a straight line from (x1, y1) to (x2, y2) and stop
      newpoints.push(endpoint)
    } else {
      xradius = Math.abs(xradius)
      yradius = Math.abs(yradius)

            // see http://www.w3.org/TR/SVG/implnote.html#ArcImplementationNotes :
      let phi = xaxisrotation * Math.PI / 180.0
      let cosphi = Math.cos(phi)
      let sinphi = Math.sin(phi)
      let minushalfdistance = startpoint.minus(endpoint).times(0.5)
            // F.6.5.1:
            // round to precision in order to have determinate calculations
      let x = Math.round((cosphi * minushalfdistance.x + sinphi * minushalfdistance.y) * decimals) / decimals
      let y = Math.round((-sinphi * minushalfdistance.x + cosphi * minushalfdistance.y) * decimals) / decimals
      let startTranslated = new Vector2D(x, y)
            // F.6.6.2:
      let biglambda = (startTranslated.x * startTranslated.x) / (xradius * xradius) + (startTranslated.y * startTranslated.y) / (yradius * yradius)
      if (biglambda > 1.0) {
                // F.6.6.3:
        let sqrtbiglambda = Math.sqrt(biglambda)
        xradius *= sqrtbiglambda
        yradius *= sqrtbiglambda
                // round to precision in order to have determinate calculations
        xradius = Math.round(xradius * decimals) / decimals
        yradius = Math.round(yradius * decimals) / decimals
      }
            // F.6.5.2:
      let multiplier1 = Math.sqrt((xradius * xradius * yradius * yradius - xradius * xradius * startTranslated.y * startTranslated.y - yradius * yradius * startTranslated.x * startTranslated.x) / (xradius * xradius * startTranslated.y * startTranslated.y + yradius * yradius * startTranslated.x * startTranslated.x))
      if (sweepFlag === largearc) multiplier1 = -multiplier1
      let centerTranslated = new Vector2D(xradius * startTranslated.y / yradius, -yradius * startTranslated.x / xradius).times(multiplier1)
            // F.6.5.3:
      let center = new Vector2D(cosphi * centerTranslated.x - sinphi * centerTranslated.y, sinphi * centerTranslated.x + cosphi * centerTranslated.y).plus((startpoint.plus(endpoint)).times(0.5))
            // F.6.5.5:
      let vec1 = new Vector2D((startTranslated.x - centerTranslated.x) / xradius, (startTranslated.y - centerTranslated.y) / yradius)
      let vec2 = new Vector2D((-startTranslated.x - centerTranslated.x) / xradius, (-startTranslated.y - centerTranslated.y) / yradius)
      let theta1 = vec1.angleRadians()
      let theta2 = vec2.angleRadians()
      let deltatheta = theta2 - theta1
      deltatheta = deltatheta % (2 * Math.PI)
      if ((!sweepFlag) && (deltatheta > 0)) {
        deltatheta -= 2 * Math.PI
      } else if ((sweepFlag) && (deltatheta < 0)) {
        deltatheta += 2 * Math.PI
      }

            // Ok, we have the center point and angle range (from theta1, deltatheta radians) so we can create the ellipse
      let numsteps = Math.ceil(Math.abs(deltatheta) / (2 * Math.PI) * resolution) + 1
      if (numsteps < 1) numsteps = 1
      for (let step = 1; step <= numsteps; step++) {
        let theta = theta1 + step / numsteps * deltatheta
        let costheta = Math.cos(theta)
        let sintheta = Math.sin(theta)
                // F.6.3.1:
        let point = new Vector2D(cosphi * xradius * costheta - sinphi * yradius * sintheta, sinphi * xradius * costheta + cosphi * yradius * sintheta).plus(center)
        newpoints.push(point)
      }
    }
    newpoints = this.points.concat(newpoints)
    let result = new Path2D(newpoints)
    return result
  }
}

module.exports = Path2D
