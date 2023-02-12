import { create } from './create.js'

/**
 * Create a clone of the given line.
 *
 * @param {line2} line - line to clone
 * @returns {line2} a new unbounded line
 * @alias module:modeling/maths/line2.clone
 */
export const clone = (line) => {
  const out = create()
  out[0] = line[0]
  out[1] = line[1]
  out[2] = line[2]
  return out
}
