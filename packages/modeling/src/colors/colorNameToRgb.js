import { cssColors } from './cssColors.js'

/**
 * Converts a CSS color name to RGB color.
 *
 * @param {String} s - the CSS color name
 * @return {Array} the RGB color, or undefined if not found
 * @alias module:modeling/colors.colorNameToRgb
 * @example
 * let mySphere = colorize(colorNameToRgb('lightblue'), sphere())
 */
export const colorNameToRgb = (s) => cssColors[s.toLowerCase()]
