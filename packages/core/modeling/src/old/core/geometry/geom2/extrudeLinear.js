const { extrude } = require('./extrusionUtils')
const translate = require('./translate')
const measureBounds = require('./measureBounds')
const vec2 = require('../../math/vec2')

/** linear extrusion of the input 2d geometry
 * @typedef  {import('./create').Geom2} Geom2
 * @typedef  {import('../Geom3/create').Geom3} Geom3
 * @param {Object} params - options for construction
 * @param {Float} params.height=1 - height of the extruded geometry
 * @param {Integer} params.slices=10 - number of intermediary steps/slices
 * @param {Integer} params.twist=0 - angle (in degrees to twist the extusion by)
 * @param {Boolean} params.center=false - whether to center extrusion or not
 * @param {Geom2} baseGeom input 2d geometry
 * @returns {Geom2} new extruded geometry
 *
 * @example:
 * const revolved = extrudeLinear({height: 10}, rectangle())
 *
 */
const extrudeLinear = (params, baseGeom) => {
  const defaults = {
    height: 1,
    slices: 10,
    twist: 0,
    center: false
  }
  const { height, twist, slices, center } = Object.assign({}, defaults, params)

  let output = extrude(baseGeom, { offset: [0, 0, height], twistangle: twist, twiststeps: slices })
  if (center === true) {
    const outputBounds = measureBounds(output)
    const offset = vec2.scale(vec2.add(outputBounds[1], outputBounds[0]), -0.5)
    output = translate(offset, output)
  }
  return output
}

module.exports = extrudeLinear
