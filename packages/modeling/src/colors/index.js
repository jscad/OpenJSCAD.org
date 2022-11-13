/**
 * All shapes (primitives or the results of operations) can be assigned a color (RGBA).
 * In all cases, the function returns the results, and never changes the original shapes.
 * @module modeling/colors
 * @example
 * import { colors } from '@jscad/modeling'
 * const { colorize, hexToRgb } = colors
 */
export { colorNameToRgb } from './colorNameToRgb.js'
export { colorize } from './colorize.js'
export { cssColors } from './cssColors.js'
export { hexToRgb } from './hexToRgb.js'
export { hslToRgb } from './hslToRgb.js'
export { hsvToRgb } from './hsvToRgb.js'
export { hueToColorComponent } from './hueToColorComponent.js'
export { rgbToHex } from './rgbToHex.js'
export { rgbToHsl } from './rgbToHsl.js'
export { rgbToHsv } from './rgbToHsv.js'
