/**
 * Flattens and filters out nullish values from the given list of arguments.
 *
 * The arguments can be composed of multiple depths of objects and arrays.
 * The output is a single flat array with no missing values.
 *
 * @param {Array} arr - list of arguments
 * @returns {Array} a flat list of arguments
 *
 * @alias module:modeling/utils.coalesce
 * @function
 */
export const coalesce = (arr) => flattenHelper(arr, [])

// Helper to recursively append to a given list.
// This is MUCH faster than other flatten methods.
const flattenHelper = (arr, out) => {
  if (Array.isArray(arr)) {
    arr.forEach((child) => flattenHelper(child, out))
  } else if (arr != null && arr !== undefined) {
    out.push(arr)
  }
  return out
}
