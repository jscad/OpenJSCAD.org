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
   * let p5 = new Geom3.Path2D([[10,-20]],false);
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
  }