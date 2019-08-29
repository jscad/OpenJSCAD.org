const cssColors = require('./cssColors')

/**
 * Converts a CSS color name to RGB color.
 *
 * @param String s - the CSS color name
 * @return Array - the RGB color, or undefined if not found
 * @example
 * let mysphere = color(colorNameToRgb('lightblue'), sphere())
 */
const colorNameToRgb = s => {
  return cssColors[s.toLowerCase()]
}

module.exports = colorNameToRgb
