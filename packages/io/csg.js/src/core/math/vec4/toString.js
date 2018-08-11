/**
 * Convert the given vec4 to a representative string
 *
 * @param {vec4} a vector to convert
 * @returns {String} representative string
 */
const toString = (vec) => {
  return `(${vec[0].toFixed(5)}, ${vec[1].toFixed(5)}, ${vec[2].toFixed(5)}, ${vec[3].toFixed(5)})`
}

module.exports = toString
