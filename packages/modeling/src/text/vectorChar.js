import { fromPoints } from '../geometries/path2/index.js'

import { vectorParams } from './vectorParams.js'

/**
 * Represents a character as an anonymous object containing a list of 2D paths.
 * @typedef {Object} VectorChar
 * @property {number} width - character width
 * @property {number} height - character height (uppercase)
 * @property {Array} paths - list of 2D paths
 */

/**
 * Construct a {@link VectorChar} from an ASCII character whose code is between 31 and 127.
 * If the character is not supported it is replaced by a question mark.
 *
 * @param {Object} [options] - options for construction
 * @param {number} [options.xOffset=0] - x offset
 * @param {number} [options.yOffset=0] - y offset
 * @param {number} [options.height=21] - font size/character height (uppercase height)
 * @param {number} [options.extrudeOffset=0] - width of the extrusion that will be applied (manually) after the creation of the character
 * @param {String} [options.input='?'] - ascii character (ignored/overwritten if provided as second parameter)
 * @param {String} [character='?'] - ascii character
 * @returns {VectorChar} a new vertor char object
 * @alias module:modeling/text.vectorChar
 *
 * @example
 * let mycharacter = vectorChar()
 * or
 * let mycharacter = vectorChar('A')
 * or
 * let mycharacter = vectorChar({ xOffset: 57 }, 'C')
 * or
 * let mycharacter = vectorChar({ xOffset: 78, input: '!' })
 */
export const vectorChar = (options, character) => {
  const {
    xOffset, yOffset, input, font, height, extrudeOffset
  } = vectorParams(options, character)

  let code = input.charCodeAt(0)
  if (!code || !font[code]) {
    code = 63 // invalid character so use ?
  }

  const glyph = [].concat(font[code])
  const ratio = (height - extrudeOffset) / font.height
  const extrudeYOffset = (extrudeOffset / 2)
  const width = glyph.shift() * ratio

  const paths = []
  let polyline = []
  for (let i = 0, il = glyph.length; i < il; i += 2) {
    const gx = ratio * glyph[i] + xOffset
    const gy = ratio * glyph[i + 1] + yOffset + extrudeYOffset
    if (glyph[i] !== undefined) {
      polyline.push([gx, gy])
      continue
    }
    paths.push(fromPoints({}, polyline))
    polyline = []
    i--
  }
  if (polyline.length) {
    paths.push(fromPoints({}, polyline))
  }

  return { width, height, paths }
}
