/**
 * Return a string representing the given line.
 *
 * @param {Line3} line - line of reference
 * @returns {string} string representation
 * @alias module:modeling/maths/line3.toString
 */
export const toString = (line) => {
  const point = line[0]
  const direction = line[1]
  return `line3: point: (${point[0].toFixed(7)}, ${point[1].toFixed(7)}, ${point[2].toFixed(7)}) direction: (${direction[0].toFixed(7)}, ${direction[1].toFixed(7)}, ${direction[2].toFixed(7)})`
}
