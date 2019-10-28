const create = require('../shape3/create')
const geom2 = require('../geometry/geom2')

/** linear extrusion of the input 2d geometry
 * @param {Object} [options] - options for construction
 * @param {Float} [options.height=1] - height of the extruded geometry
 * @param {Integer} [options.slices=10] - number of intermediary steps/slices
 * @param {Integer} [options.twist=0] - angle (in degrees to twist the extusion by)
 * @param {Boolean} [options.center=false] - whether to center extrusion or not
 * @param {Shape2} shape input 2d geometry
 * @returns {Shape3} new extruded geometry
 *
 * @example
 * const revolved = linearExtrude({height: 10}, rectangle())
 */
const linearExtrude = (params, shape) => {
  const geometry = geom2.linearExtrude(params, shape)
  const newShape = create()
  newShape.geometry = geometry
  return newShape
}

module.exports = linearExtrude
