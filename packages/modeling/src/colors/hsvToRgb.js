const flatten = require('../utils/flatten')

/**
 * Converts HSV color values to RGB color values.
 *
 * @see http://en.wikipedia.org/wiki/HSV_color_space.
 * @param {...Number|Array} values - HSV or HSVA color values
 * @return {Array} RGB or RGBA color values
 * @alias module:modeling/colors.hsvToRgb
 *
 * @example
 * let mysphere = colorize(hsvToRgb([0.9166666666666666, 1, 1]), sphere())
 */
const hsvToRgb = (...values) => {
  values = flatten(values)
  if (values.length < 3) throw new Error('values must contain H, S and V values')

  const h = values[0]
  const s = values[1]
  const v = values[2]

  let r = 0
  let g = 0
  let b = 0

  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)

  switch (i % 6) {
    case 0:
      r = v
      g = t
      b = p
      break
    case 1:
      r = q
      g = v
      b = p
      break
    case 2:
      r = p
      g = v
      b = t
      break
    case 3:
      r = p
      g = q
      b = v
      break
    case 4:
      r = t
      g = p
      b = v
      break
    case 5:
      r = v
      g = p
      b = q
      break
  }

  if (values.length > 3) {
    // add alpha value if provided
    const a = values[3]
    return [r, g, b, a]
  }
  return [r, g, b]
}

module.exports = hsvToRgb
