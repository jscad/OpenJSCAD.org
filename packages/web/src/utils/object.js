/** returns an object with the given properties of the input object
 * filtered out
 * DO NOT USE on anything but basic data, prototype is not conserved !
 * @param  {Object} object the object you want the properties removed from
 * @param  {Array} propertiesToFilter an array of property names
 * @returns {Object} a new object
 */
const omit = (propertiesToFilter, object) => Object.keys(object).reduce((result, key) => {
  if (!propertiesToFilter.includes(key)) {
    // eslint-disable-next-line no-param-reassign
    result[key] = object[key]
  }
  return result
}, {})

/** returns an object with ONLY the given properties of the input object
 * DO NOT USE on anything but basic data, prototype is not conserved !
 * @param  {Object} object the object you want the properties removed from
 * @param  {Array} propertiesToFilter an array of property names
 * @returns {Object} a new object
 */
const keep = (propertiesToFilter, object) => Object.keys(object).reduce((result, key) => {
  if (propertiesToFilter.includes(key)) {
    // eslint-disable-next-line no-param-reassign
    result[key] = object[key]
  }
  return result
}, {})

const atKey = (key, object) => {
  if (key in object) {
    return key
  }
  return {}
}

module.exports = { omit, keep, atKey }
