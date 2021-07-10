/**
 * Copy the given line to the receiving line.
 *
 * @param {line2} out - receiving line
 * @param {line2} line - line to copy
 * @returns {line2} out
 * @alias module:modeling/maths/line2.copy
 */
const copy = (out, line) => {
  out[0] = line[0]
  out[1] = line[1]
  out[2] = line[2]
  return out
}

module.exports = copy
