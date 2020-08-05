/**
 * Converts CSS color notations (string of hex values) to RGB values.
 *
 * @see https://www.w3.org/TR/css-color-3/
 * @param {String} notation - color notation
 * @return {Array} RGB color values
 * @alias module:modeling/colors.hexToRgb
 *
 * @example
 * let mysphere = colorize(hexToRgb('#000080'), sphere()) // navy blue
 */
const hexToRgb = (notation) => {
  notation = notation.replace('#', '')
  if (notation.length < 6) throw new Error('the given notation must contain 3 or more hex values')

  const r = parseInt(notation.substring(0, 2), 16) / 255
  const g = parseInt(notation.substring(2, 4), 16) / 255
  const b = parseInt(notation.substring(4, 6), 16) / 255
  if (notation.length >= 8) {
    const a = parseInt(notation.substring(6, 8), 16) / 255
    return [r, g, b, a]
  }
  return [r, g, b]
}

module.exports = hexToRgb
