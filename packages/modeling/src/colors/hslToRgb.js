const flatten = require('../utils/flatten')

const hueToColorComponent = require('./hueToColorComponent')

/**
 * Converts HSL color values to RGB color values.
 *
 * @see http://en.wikipedia.org/wiki/HSL_color_space
 * @param {...Number|Array} values - HSL or HSLA color values
 * @return {Array} RGB or RGBA color values
 * @alias module:modeling/colors.hslToRgb
 *
 * @example
 * let mysphere = colorize(hslToRgb([0.9166666666666666, 1, 0.5]), sphere())
 */
const hslToRgb = (...values) => {
  values = flatten(values)
  if (values.length < 3) throw new Error('values must contain H, S and L values')

  const h = values[0]
  const s = values[1]
  const l = values[2]

  let r = l // default is achromatic
  let g = l
  let b = l

  if (s !== 0) {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hueToColorComponent(p, q, h + 1 / 3)
    g = hueToColorComponent(p, q, h)
    b = hueToColorComponent(p, q, h - 1 / 3)
  }

  if (values.length > 3) {
    // add alpha value if provided
    const a = values[3]
    return [r, g, b, a]
  }
  return [r, g, b]
}

module.exports = hslToRgb
