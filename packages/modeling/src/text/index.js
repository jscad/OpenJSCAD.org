/**
 * Texts provide sets of segments for each character or text strings.
 * The segments can be used to create outlines for both 2D and 3D geometry.
 * Note: Only ASCII characters are supported.
 * @module modeling/text
 * @example
 * const { vectorChar, vectorText } = require('@jscad/modeling').text
 */
module.exports = {
  vectorChar: require('./vectorChar'),
  vectorText: require('./vectorText')
}
