/**
 * Represents a unbounded line in 2D space, positioned at a point of origin.
 * @see {@link line2} for data structure information.
 * @module modeling/maths/line2
 */
module.exports = {
  clone: require('./clone'),
  closestPoint: require('./closestPoint'),
  copy: require('./copy'),
  create: require('./create'),
  direction: require('./direction'),
  distanceToPoint: require('./distanceToPoint'),
  equals: require('./equals'),
  fromPoints: require('./fromPoints'),
  fromValues: require('./fromValues'),
  intersectPointOfLines: require('./intersectPointOfLines'),
  origin: require('./origin'),
  reverse: require('./reverse'),
  toString: require('./toString'),
  transform: require('./transform'),
  xAtY: require('./xAtY')
}
