/**
 * Represents a unbounded line in 3D space, positioned at a point of origin.
 * @see {@link line3} for data structure information.
 * @module modeling/maths/line3
 */
module.exports = {
  clone: require('./clone'),
  closestPoint: require('./closestPoint'),
  copy: require('./copy'),
  create: require('./create'),
  direction: require('./direction'),
  distanceToPoint: require('./distanceToPoint'),
  equals: require('./equals'),
  fromPlanes: require('./fromPlanes'),
  fromPointAndDirection: require('./fromPointAndDirection'),
  fromPoints: require('./fromPoints'),
  intersectPointOfLineAndPlane: require('./intersectPointOfLineAndPlane'),
  origin: require('./origin'),
  reverse: require('./reverse'),
  toString: require('./toString'),
  transform: require('./transform')
}
