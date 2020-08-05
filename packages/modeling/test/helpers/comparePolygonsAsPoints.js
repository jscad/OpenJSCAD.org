const compareVectors = require('./compareVectors')

const comparePolygons = (poly1, poly2) => {
  if (poly1.length === poly2.length) {
    return poly1.reduce((valid, point, index) => valid && compareVectors(poly1[index], poly2[index]), true)
  }
  return false
}

/**
 * Compare two list of points for equality
 * @param (Array} list1 - list of polygons, represented as points
 * @param (Array} list2 - list of polygons, represented as points
 * @returns {boolean} result of comparison
 */
const comparePolygonsAsPoints = (list1, list2) => {
  if (list1.length === list2.length) {
    return list1.reduce((valid, polygon, index) => valid && comparePolygons(list1[index], list2[index]), true)
  }
  return false
}

module.exports = comparePolygonsAsPoints
