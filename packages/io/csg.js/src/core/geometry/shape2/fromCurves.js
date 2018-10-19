const create = require('./create')
const curve2 = require('../curves')

/** Construct a Shape2 from a list of curves (line, bezier)
 * @param {Side[]} sides - list of curves
 * @returns {Shape2} new Shape2 object
 */
const fromCurves = function (curves) {
  const shape2 = create()
  shape2.curves = curves.map(curve => curve2.clone(curve))
  return shape2
}

module.exports = fromCurves
