/**
 * Flatten the given list of arguments into a single flat array.
 * The arguments can be composed of multiple depths of objects and arrays.
 * @param {Array} arr - list of arguments
 * @returns {Array} a flat list of arguments
 * @alias module:modeling/utils.flatten
 */
const flatten = (arr) => {
  const result = []
  const stack = [arr]
  while (stack.length) {
    const item = stack.pop()
    if (Array.isArray(item)) {
      // Push in reverse order so first element is processed first
      for (let i = item.length - 1; i >= 0; i--) {
        stack.push(item[i])
      }
    } else {
      result.push(item)
    }
  }
  return result
}

module.exports = flatten
