const hasPointInside = require('./validateHasPointInside')

/** Check if all points from one CAG stay inside another CAG
* @param {CAG} cag1 - CAG object
* @param {Object} cag2 - CAG object
* @returns {Boolean}
*/
const contains = function (cag1, cag2) {
  for (let i = 0, il = cag2.sides.length; i < il; i++) {
    if (!hasPointInside(cag1, cag2.sides[i].vertex0.pos)) {
      return false
    }
  }
  return true
}

module.exports = contains
