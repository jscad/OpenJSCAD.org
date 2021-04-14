/**
 * All shapes (primitives or the results of operations) can be assigned a color (RGBA).
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/colors
 * @example
 * const { colorize, hexToRgb } = require('@jscad/modeling').colors
 */
module.exports = {
  colorize: require('./colorize'),
  colorNameToRgb: require('./colorNameToRgb'),
  cssColors: require('./cssColors'),
  hexToRgb: require('./hexToRgb'),
  hslToRgb: require('./hslToRgb'),
  hsvToRgb: require('./hsvToRgb'),
  hueToColorComponent: require('./hueToColorComponent'),
  rgbToHex: require('./rgbToHex'),
  rgbToHsl: require('./rgbToHsl'),
  rgbToHsv: require('./rgbToHsv')
}
