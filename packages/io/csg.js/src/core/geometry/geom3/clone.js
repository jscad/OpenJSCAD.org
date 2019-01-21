const poly3 = require('../poly3')

/** create a copy/clone of the input geometry
 * @typedef  {import('./create').Geom3} Geom3
 * @param  {Geom3} sourceGeometry the geometry to clone
 * @returns {Geom3} the new clone
 */
const clone = sourceGeometry => {
  return {
    polygons: sourceGeometry.polygons.map(p => poly3.clone(p)),
    isCanonicalized: sourceGeometry.isCanonicalized,
    isRetesselated: sourceGeometry.isRetesselated
  }
}

module.exports = clone
