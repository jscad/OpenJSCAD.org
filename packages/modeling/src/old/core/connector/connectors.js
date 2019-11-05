const vec2 = require('../math/vec2')
const vec3 = require('../math/vec3')

// FIXME: is this usefull as part of core, or purely visual ?
/* axisLine: function () {
  return new Line3D(this.point, this.axis)
} */

// old 'connectors list' for now only array of connectors, DO NOT REMOVE FOR NOW !!

const fromPath2 = (path, arg1, arg2) => {
  if (arguments.length === 3) {
    return fromPath2Tangents(path, arg1, arg2)
  } else if (arguments.length === 2) {
    return fromPath2AndAngle(path, arg1)
  } else {
    throw new Error('FromPath2 requires either a path and 2 direction vectors, or a function returning direction vectors')
  }
}

/*
 * calculate the connector axisvectors by calculating the "tangent" for path.
 * This is undefined for start and end points, so axis for these have to be manually
 * provided.
 */
const fromPath2Tangents = (path, start, end) => {
  const defaultNormal = [0, 0, 1]
  // path
  let axis
  let pathLen = path.points.length
  let result = [
    fromPointAxisNormal(path.points[0], start, defaultNormal)]
  // middle points
  path.points.slice(1, pathLen - 1).forEach((p2, i) => {
    axis = vec3.fromVec2(vec2.subtract(path.points[i + 2], path.points[i]))
    result.push(fromPointAxisNormal(vec3.fromVec2(p2), axis, defaultNormal))
  }, this)
  // other points
  result.push(fromPointAxisNormal(path.points[pathLen - 1], end, defaultNormal))
  // result.closed = path.closed // FIXME: meh, do we still need this ??
  return result
}

/*
 * angleIsh: either a static angle, or a function(point) returning an angle
 */
const fromPath2AndAngle = (path, angleIsh) => {
  const defaultNormal = [0, 0, 1]
  const getAngle = (angleIsh, pt, i) => {
    if (typeof angleIsh === 'function') {
      angleIsh = angleIsh(pt, i)
    }
    return angleIsh
  }
  let result = path.points.map((p2, i) => {
    const axis = vec3.rotateZ(getAngle(angleIsh, p2, i), vec3.fromValues(1, 0, 0))
    return fromPointAxisNormal(vec3.fromVec2(p2), axis, defaultNormal)
  })
  // result.closed = path.closed // FIXME: meh, do we still need this ??
  return result
}

const verify = connectors => {
  let connI
  let connI1
  for (let i = 0; i < connectors.length - 1; i++) {
    connI = connectors[i]
    connI1 = connectors[i + 1]
    if (connI1.point.minus(connI.point).dot(connI.axis) <= 0) {
      throw new Error('Invalid ConnectorList. Each connectors position needs to be within a <90deg range of previous connectors axis')
    }
    if (connI.axis.dot(connI1.axis) <= 0) {
      throw new Error('invalid ConnectorList. No neighboring connectors axisvectors may span a >=90deg angle')
    }
  }
}

ConnectorList.prototype = {
  /*
     * arguments: cagish: a cag or a function(connector) returning a cag
     *            closed: whether the 3d path defined by connectors location
     *              should be closed or stay open
     *              Note: don't duplicate connectors in the path
     * TODO: consider an option "maySelfIntersect" to close & force union all single segments
     */
  followWith: function (cagish) {
    const CSG = require('./CSG') // FIXME , circular dependency connectors => CSG => connectors

    this.verify()
    function getCag (cagish, connector) {
      if (typeof cagish === 'function') {
        cagish = cagish(connector.point, connector.axis, connector.normal)
      }
      return cagish
    }

    let polygons = []
    let currCag
    let prevConnector = this.connectors_[this.connectors_.length - 1]
    let prevCag = getCag(cagish, prevConnector)
    // add walls
    this.connectors_.forEach(function (connector, notFirst) {
      currCag = getCag(cagish, connector)
      if (notFirst || this.closed) {
        polygons.push.apply(polygons, prevCag._toWallPolygons({
          toConnector1: prevConnector, toConnector2: connector, cag: currCag }))
      } else {
        // it is the first, and shape not closed -> build start wall
        polygons.push.apply(polygons,
          currCag._toPlanePolygons({ toConnector: connector, flipped: true }))
      }
      if (notFirst === this.connectors_.length - 1 && !this.closed) {
        // build end wall
        polygons.push.apply(polygons,
          currCag._toPlanePolygons({ toConnector: connector }))
      }
      prevCag = currCag
      prevConnector = connector
    }, this)
    return CSG.fromPolygons(polygons).reTesselated().canonicalized()
  }
  /*
     * general idea behind these checks: connectors need to have smooth transition from one to another
     * TODO: add a check that 2 follow-on CAGs are not intersecting
     */

}

module.exports = { Connector, ConnectorList }
