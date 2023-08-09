import * as mat4 from '../maths/mat4/index.js'
import * as path2 from '../geometries/path2/index.js'

import { vectorChar } from './vectorChar.js'
import { vectorParams } from './vectorParams.js'

/**
 * Represents a line of characters as an anonymous object containing a list of VectorChar.
 * @typedef {Object} VectorLine
 * @property {number} width - sum of character width and letter spacing
 * @property {number} height - maximum height of character heights
 * @property {Array} characters - list of vector characters
 */

const matrix = mat4.create()

const translateLine = (options, line) => {
  const { x, y } = Object.assign({ x: 0, y: 0 }, options)

  mat4.identity(matrix)
  mat4.translate(matrix, matrix, [x, y, 0])

  line.chars = line.chars.map((vchar) => {
    vchar.paths = vchar.paths.map((path) => {
      return path2.transform(matrix, path)
    })
    return vchar
  })
  return line
}

/**
 * Construct an array of character segments from an ascii string whose characters code is between 31 and 127,
 * if one character is not supported it is replaced by a question mark.
 * @param {object|string} [options] - options for construction or ascii string
 * @param {number} [options.xOffset=0] - x offset
 * @param {number} [options.yOffset=0] - y offset
 * @param {number} [options.height=14] - height of requested characters (uppercase height), i.e. font height in points
 * @param {number} [options.lineSpacing=30/14] - line spacing expressed as a percentage of height
 * @param {number} [options.letterSpacing=0] - extra letter spacing, expressed as a proportion of height, i.e. like CSS em
 * @param {string} [options.align='left'] - multi-line text alignment: left, center, right
 * @param {number} [options.extrudeOffset=0] - width of the extrusion that will be applied (manually) after the creation of the character
 * @param {string} [options.input='?'] - ascii string (ignored/overwrited if provided as seconds parameter)
 * @param {string} [text='?'] - ascii string
 * @returns {Array} list of vector line objects, where each line contains a list of vector character objects
 * @alias module:modeling/text.vectorText
 *
 * @example
 * let mylines = vectorText()
 * or
 * let mylines = vectorText('OpenJSCAD')
 * or
 * let mylines = vectorText({ yOffset: -50 }, 'OpenJSCAD')
 * or
 * let mylines = vectorText({ yOffset: -80, input: 'OpenJSCAD' })
 */
export const vectorText = (options, text) => {
  const {
    xOffset, yOffset, input, font, height, align, extrudeOffset, lineSpacing, letterSpacing
  } = vectorParams(options, text)

  // NOTE: Just like CSS letter-spacing, the spacing could be positive or negative
  const extraLetterSpacing = (height * letterSpacing)

  // manage the list of lines
  let maxWidth = 0 // keep track of max width for final alignment
  let line = { width: 0, height: 0, chars: [] }
  let lines = []

  const pushLine = () => {
    maxWidth = Math.max(maxWidth, line.width)

    if (line.chars.length) lines.push(line)
    line = { width: 0, height: 0, chars: [] }
  }

  // convert the text into a list of vector lines
  let x = xOffset
  let y = yOffset
  let vchar
  let il = input.length
  for (let i = 0; i < il; i++) {
    const character = input[i]
    if (character === '\n') {
      pushLine()

      // reset x and y for a new line
      x = xOffset
      y -= height * lineSpacing
      continue
    }
    // convert the character
    vchar = vectorChar({ xOffset: x, yOffset: y, font, height, extrudeOffset }, character)

    let width = vchar.width + extraLetterSpacing
    x += width

    // update current line
    line.width += width
    line.height = Math.max(line.height, vchar.height)
    if (character !== ' ') {
      line.chars = line.chars.concat(vchar)
    }
  }
  if (line.chars.length) pushLine()

  // align all lines as requested
  lines = lines.map((line) => {
    const diff = maxWidth - line.width
    if (align === 'right') {
      return translateLine({ x: diff }, line)
    } else if (align === 'center') {
      return translateLine({ x: diff / 2 }, line)
    } else {
      return line
    }
  })
  return lines
}
