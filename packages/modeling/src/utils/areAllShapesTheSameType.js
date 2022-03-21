// list of supported geometries
const geom2 = require('../geometries/geom2')
const geom3 = require('../geometries/geom3')
const path2 = require('../geometries/path2')

/**
 * @param {Array} shapes - list of shapes to compare
 * @returns {Boolean} true if the given shapes are of the same type
 * @alias module:modeling/utils.areAllShapesTheSameType
 */
const areAllShapesTheSameType = (shapes) => {
  let previousType
  for (const shape of shapes) {
    let currentType = 0
    if (geom2.isA(shape)) currentType = 1
    if (geom3.isA(shape)) currentType = 2
    if (path2.isA(shape)) currentType = 3

    if (previousType && currentType !== previousType) return false
    previousType = currentType
  }
  return true
}

module.exports = areAllShapesTheSameType
