const compareVectors = require('./compareVectors')

/**
 * Compare two list of points for equality
 * @param {Array} list1 - list of points
 * @param {Array} list2 - list of points
 * @returns {boolean} result of comparison
 */
const comparePoints = (list1, list2) => {
  if (list1.length === list2.length) {
    return list1.reduce((valid, point, index) => valid && compareVectors(list1[index], list2[index]), true)
  }
  return false
}

module.exports = comparePoints
