// list of supported geometries
const {geom2, geom3, path2} = require('../../geometry')

const areAllShapesTheSameType = (shapes) => {
  let previousType
  shapes.forEach((shape) => {
    let currentType = 0
    if (geom2.isA(shape)) currentType = 1
    if (geom3.isA(shape)) currentType = 2
    if (path2.isA(shape)) currentType = 3

    if (previousType && currentType !== previousType) return false
    previousType = currentType
  })
  return true
}

module.exports = areAllShapesTheSameType
