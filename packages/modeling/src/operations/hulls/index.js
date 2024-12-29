/**
 * All shapes (primitives or the results of operations) can be passed to hull functions
 * to determine the convex hull of all points.
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/hulls
 * @example
 * const { hull, hullChain, hullPoints2, hullPoints3 } = require('@jscad/modeling').hulls
 */
module.exports = {
  hull: require('./hull'),
  hullChain: require('./hullChain'),
  hullPoints2: require('./hullPoints2'),
  hullPoints3: require('./hullPoints3')
}
