const {extrude} = require('./extrusionUtils')
const translate = require('../ops-transformations/translate')
const bounds = require('../ops-measurements/bounds')

/** linear extrusion of the input 2d shape
 * @param {Object} [options] - options for construction
 * @param {Float} [options.height=1] - height of the extruded shape
 * @param {Integer} [options.slices=10] - number of intermediary steps/slices
 * @param {Integer} [options.twist=0] - angle (in degrees to twist the extusion by)
 * @param {Boolean} [options.center=false] - whether to center extrusion or not
 * @param {CAG} baseShape input 2d shape
 * @returns {CSG} new extruded shape
 *
 * @example
 * let revolved = linearExtrude({height: 10}, rectangle())
 */
function linearExtrude (params, baseShape) {
  const defaults = {
    height: 1,
    slices: 10,
    twist: 0,
    center: false
  }
  const {height, twist, slices, center} = Object.assign({}, defaults, params)

  let output = extrude(baseShape, {offset: [0, 0, height], twistangle: twist, twiststeps: slices})
  if (center === true) {
    const outputBounds = bounds(output)
    const offset = (outputBounds[1].plus(outputBounds[0])).times(-0.5)
    output = translate(offset, output)
  }
  return output
}

module.exports = linearExtrude
