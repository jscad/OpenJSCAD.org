import { fromPoints } from '../geometries/path2/index.js'
import * as vec2 from '../maths/vec2/index.js'

import { simplex } from './fonts/single-line/hershey/simplex.js'

const defaultsVectorParams = {
  xOffset: 0,
  yOffset: 0,
  font: simplex,
  height: 14, // old vector_xxx simplex font height
  extrudeOffset: 0
}

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
 * @param {object} options - options for text construction
 * @param {number} [options.xOffset=0] - x offset
 * @param {number} [options.yOffset=0] - y offset
 * @param {number} [options.height=21] - font size/character height (uppercase height)
 * @param {number} [options.extrudeOffset=0] - width of the extrusion that will be applied (manually) after the creation of the character
 * @param {string} text - ascii character
 * @returns {VectorChar} a new vertor char object
 * @alias module:modeling/text.vectorChar
 *
 * @example
 * let mycharacter = vectorChar({ xOffset: 57 }, 'C')
 */
export const vectorChar = (options, text) => {
  const {
    xOffset, yOffset, font, height, extrudeOffset
  } = Object.assign({}, defaultsVectorParams, options)

  if (typeof text !== 'string' || text.length !== 1) {
    throw new Error('text must be a single character')
  }

  let code = text.charCodeAt(0)
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
      polyline.push(vec2.fromValues(gx, gy))
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
