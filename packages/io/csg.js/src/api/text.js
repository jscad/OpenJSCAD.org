const defaultFont = require('../fonts/single-line/hershey/simplex.js')
const { union } = require('./ops-booleans')

const defaultsVectorParams = {
  xOffset: 0,
  yOffset: 0,
  input: '?',
  align: 'left',
  font: defaultFont,
  height: 14, // == old vector_xxx simplex font height
  lineSpacing: 2.142857142857143, // == 30/14 == old vector_xxx ratio
  letterSpacing: 1,
  extrudeOffset: 0
}

// vectorsXXX parameters handler
function vectorParams (options, input) {
  if (!input && typeof options === 'string') {
    options = { input: options }
  }
  options = options || {}
  let params = Object.assign({}, defaultsVectorParams, options)
  params.input = input || params.input
  return params
}

// translate text line
function translateLine (options, line) {
  const { x, y } = Object.assign({ x: 0, y: 0 }, options || {})
  let segments = line.segments
  let segment = null
  let point = null
  for (let i = 0, il = segments.length; i < il; i++) {
    segment = segments[i]
    for (let j = 0, jl = segment.length; j < jl; j++) {
      point = segment[j]
      segment[j] = [point[0] + x, point[1] + y]
    }
  }
  return line
}

/** Represents a character as segments
* @typedef {Object} VectorCharObject
* @property {Float} width - character width
* @property {Float} height - character height (uppercase)
* @property {Array} segments - character segments [[[x, y], ...], ...]
*/

/** Construct a {@link VectorCharObject} from a ascii character whose code is between 31 and 127,
* if the character is not supported it is replaced by a question mark.
* @param {Object|String} [options] - options for construction or ascii character
* @param {Float} [options.xOffset=0] - x offset
* @param {Float} [options.yOffset=0] - y offset
* @param {Float} [options.height=21] - font size (uppercase height)
* @param {Float} [options.extrudeOffset=0] - width of the extrusion that will be applied (manually) after the creation of the character
* @param {String} [options.input='?'] - ascii character (ignored/overwrited if provided as seconds parameter)
* @param {String} [char='?'] - ascii character
* @returns {VectorCharObject}
*
* @example
* let vectorCharObject = vectorChar()
* or
* let vectorCharObject = vectorChar('A')
* or
* let vectorCharObject = vectorChar({ xOffset: 57 }, 'C')
* or
* let vectorCharObject = vectorChar({ xOffset: 78, input: '!' })
*/
function vectorChar (options, char) {
  let {
    xOffset, yOffset, input, font, height, extrudeOffset
  } = vectorParams(options, char)
  let code = input.charCodeAt(0)
  if (!code || !font[code]) {
    code = 63 // 63 => ?
  }
  let glyph = [].concat(font[code])
  let ratio = (height - extrudeOffset) / font.height
  let extrudeYOffset = (extrudeOffset / 2)
  let width = glyph.shift() * ratio
  let segments = []
  let polyline = []
  for (let i = 0, il = glyph.length; i < il; i += 2) {
    gx = ratio * glyph[i] + xOffset
    gy = ratio * glyph[i + 1] + yOffset + extrudeYOffset
    if (glyph[i] !== undefined) {
      polyline.push([ gx, gy ])
      continue
    }
    segments.push(polyline)
    polyline = []
    i--
  }
  if (polyline.length) {
    segments.push(polyline)
  }
  return { width, height, segments }
}

/** Construct an array of character segments from a ascii string whose characters code is between 31 and 127,
* if one character is not supported it is replaced by a question mark.
* @param {Object|String} [options] - options for construction or ascii string
* @param {Float} [options.xOffset=0] - x offset
* @param {Float} [options.yOffset=0] - y offset
* @param {Float} [options.height=21] - font size (uppercase height)
* @param {Float} [options.lineSpacing=1.4] - line spacing expressed as a percentage of font size
* @param {Float} [options.letterSpacing=1] - extra letter spacing expressed as a percentage of font size
* @param {String} [options.align='left'] - multi-line text alignement: left, center or right
* @param {Float} [options.extrudeOffset=0] - width of the extrusion that will be applied (manually) after the creation of the character
* @param {String} [options.input='?'] - ascii string (ignored/overwrited if provided as seconds parameter)
* @param {String} [text='?'] - ascii string
* @returns {Array} characters segments [[[x, y], ...], ...]
*
* @example
* let textSegments = vectorText()
* or
* let textSegments = vectorText('OpenJSCAD')
* or
* let textSegments = vectorText({ yOffset: -50 }, 'OpenJSCAD')
* or
* let textSegments = vectorText({ yOffset: -80, input: 'OpenJSCAD' })
*/
function vectorText (options, text) {
  let {
    xOffset, yOffset, input, font, height, align, extrudeOffset, lineSpacing, letterSpacing
  } = vectorParams(options, text)
  let [ x, y ] = [ xOffset, yOffset ]
  let [ i, il, char, vect, width, diff ] = []
  let line = { width: 0, segments: [] }
  let lines = []
  let output = []
  let maxWidth = 0
  let lineStart = x
  const pushLine = () => {
    lines.push(line)
    maxWidth = Math.max(maxWidth, line.width)
    line = { width: 0, segments: [] }
  }
  for (i = 0, il = input.length; i < il; i++) {
    char = input[i]
    vect = vectorChar({ xOffset: x, yOffset: y, font, height, extrudeOffset }, char)
    if (char === '\n') {
      x = lineStart
      y -= vect.height * lineSpacing
      pushLine()
      continue
    }
    width = vect.width * letterSpacing
    line.width += width
    x += width
    if (char !== ' ') {
      line.segments = line.segments.concat(vect.segments)
    }
  }
  if (line.segments.length) {
    pushLine()
  }
  for (i = 0, il = lines.length; i < il; i++) {
    line = lines[i]
    if (maxWidth > line.width) {
      diff = maxWidth - line.width
      if (align === 'right') {
        line = translateLine({ x: diff }, line)
      } else if (align === 'center') {
        line = translateLine({ x: diff / 2 }, line)
      }
    }
    output = output.concat(line.segments)
  }
  return output
}

/** Construct a {@link VectorCharObject} from a ascii character whose code is between 31 and 127,
* if the character is not supported it is replaced by a question mark.
* @param {Float} x - x offset
* @param {Float} y - y offset
* @param {String} char - ascii character
* @returns {VectorCharObject}
* @deprecated >= v2

* @example
* let vectorCharObject = vector_char(36, 0, 'B')
*/
function vector_char (x, y, char) {
  return vectorChar({ xOffset: x, yOffset: y }, char)
}

/** Construct an array of character segments from a ascii string whose characters code is between 31 and 127,
* if one character is not supported it is replaced by a question mark.
* @param {Float} x - x offset
* @param {Float} y - y offset
* @param {String} text - ascii string
* @returns {Array} characters segments [[[x, y], ...], ...]
* @deprecated >= v2
*
* @example
* let textSegments = vector_text(0, -20, 'OpenJSCAD')
*/
function vector_text (x, y, text) {
  return vectorText({ xOffset: x, yOffset: y }, text)
}

module.exports = {
  vector_char,
  vector_text,
  vectorChar,
  vectorText
}
