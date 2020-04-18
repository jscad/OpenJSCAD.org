const flatten = require('../utils/flatten')

const hueToColorComponent = require('./hueToColorComponent')

/**
 * Converts HSL color values to RGB color values.
 *
 * @see http://en.wikipedia.org/wiki/HSL_color_space.
 * @param {Number[]|Number,Number,Number} values - HSL color values
 * @return {Array} RGB color values
 * @alias module:color.hslToRgb
 *
 * @example
 * let mysphere = color(hslToRgb([0.9166666666666666, 1, 0.5]), sphere())
 */
const hslToRgb = (...values) => {
  values = flatten(values)
  if (values.length < 3) throw new Error('values must contain H, S and L values')

  let h = values[0]
  let s = values[1]
  let l = values[2]

  let r = l // default is achromatic
  let g = l
  let b = l

  if (s !== 0) {
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s
    let p = 2 * l - q
    r = hueToColorComponent(p, q, h + 1 / 3)
    g = hueToColorComponent(p, q, h)
    b = hueToColorComponent(p, q, h - 1 / 3)
  }

  if (values.length > 3) {
    // add alpha value if provided
    let a = values[3]
    return [r, g, b, a]
  }
  return [r, g, b]
}

module.exports = hslToRgb
