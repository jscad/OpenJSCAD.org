/**
 * Return a string representing the given line.
 *
 * @param {line3} line - the line of reference
 * @returns {String} string representation
 * @alias module:modeling/maths/line3.toString
 */
const toString = (line) => {
  const point = line[0]
  const unit = line[1]
  return `line3: point: (${point[0].toFixed(7)}, ${point[1].toFixed(7)}, ${point[2].toFixed(7)}) unit: (${unit[0].toFixed(7)}, ${unit[1].toFixed(7)}, ${unit[2].toFixed(7)})`
}

module.exports = toString
