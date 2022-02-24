const vectorChar = require('./vectorChar')
const vectorParams = require('./vectorParams')

// translate text line
const translateLine = (options, line) => {
  const { x, y } = Object.assign({ x: 0, y: 0 }, options || {})
  const segments = line.segments
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

/**
 * Construct an array of character segments from a ascii string whose characters code is between 31 and 127,
 * if one character is not supported it is replaced by a question mark.
 * @param {Object|String} [options] - options for construction or ascii string
 * @param {Float} [options.xOffset=0] - x offset
 * @param {Float} [options.yOffset=0] - y offset
 * @param {Float} [options.height=21] - font size (uppercase height)
 * @param {Float} [options.lineSpacing=1.4] - line spacing expressed as a percentage of font size
 * @param {Float} [options.letterSpacing=1] - extra letter spacing expressed as a percentage of font size
 * @param {String} [options.align='left'] - multi-line text alignment: left, center, right
 * @param {Float} [options.extrudeOffset=0] - width of the extrusion that will be applied (manually) after the creation of the character
 * @param {String} [options.input='?'] - ascii string (ignored/overwrited if provided as seconds parameter)
 * @param {String} [text='?'] - ascii string
 * @returns {Array} characters segments [[[x, y], ...], ...]
 * @alias module:modeling/text.vectorText
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
const vectorText = (options, text) => {
  const {
    xOffset, yOffset, input, font, height, align, extrudeOffset, lineSpacing, letterSpacing
  } = vectorParams(options, text)
  let [x, y] = [xOffset, yOffset]
  let i, il, char, vect, width, diff
  let line = { width: 0, segments: [] }
  const lines = []
  let output = []
  let maxWidth = 0
  const lineStart = x
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

module.exports = vectorText
