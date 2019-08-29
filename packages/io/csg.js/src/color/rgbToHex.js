/**
 * Convert the given RGB color values to CSS color notation (string)
 * @see https://www.w3.org/TR/css-color-3/
 * @param {Array} values - RGB color values
 * @return {String} CSS color notation
 *
 */
const rgbToHex = (values) => {
  if (!Array.isArray(values)) throw new Error('values must be an array')
  if (values.length < 3) throw new Error('values must contain R, G and B values')

  let r = values[0] * 255
  let g = values[1] * 255
  let b = values[2] * 255

  let s = `#${Number(0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).substring(1, 7)}`

  if (values.length > 3) {
    // convert alpha to opacity
    s = s + Number(values[3] * 255).toString(16)
  }
  return s
}

module.exports = rgbToHex
