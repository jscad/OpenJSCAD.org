/**
 * Clone the given object by either calling clone() method or using Object.assign.
 * This is a shallow copy as all modeling should use immutable objects
 * @param {Object} object - object to copy
 * @returns {Object} - a shallow copy of an object
 * @alias module:modeling/utils.clone
 */
const clone = (object) => {
  if (object === null || object === undefined) return object
  // return Object.assign({}, object)
  return object.clone ? object.clone() : Object.assign({}, object)
}

module.exports = clone
