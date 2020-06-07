const flatten = require('../utils/flatten')

/**
 * Convert the given RGB color values to CSS color notation (string)
 * @see https://www.w3.org/TR/css-color-3/
 * @param {...Number|Array} values - RGB or RGBA color values
 * @return {String} CSS color notation
 * @alias module:modeling/colors.rgbToHex
 */
const rgbToHex = (...values) => {
  values = flatten(values)
  if (values.length < 3) throw new Error('values must contain R, G and B values')

  const r = values[0] * 255
  const g = values[1] * 255
  const b = values[2] * 255

  let s = `#${Number(0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).substring(1, 7)}`

  if (values.length > 3) {
    // convert alpha to opacity
    s = s + Number(values[3] * 255).toString(16)
  }
  return s
}

module.exports = rgbToHex
