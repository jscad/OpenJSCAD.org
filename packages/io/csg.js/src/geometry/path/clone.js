/**
 * Performs a shallow copy of the object.
 * @params {path} path - the path to make a shallow copy of.
 * @returns {path} the copied path.
 */
const clone = path => Object.assign({}, path)

module.exports = clone
