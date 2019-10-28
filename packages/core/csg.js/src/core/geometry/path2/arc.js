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
 * @example:
 * let path = Geom3.Path2D.arc({
 *   center: [5, 5],
 *   radius: 10,
 *   startangle: 90,
 *   endangle: 180,
 *   resolution: 36,
 *   maketangent: true
 * });
 */
const arc = (options) => {
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

module.exports = arc
