const comparePolygon = require('../../../test/helpers/comparePolygons') // rename

const comparePolygons = (polygons1, polygons2) => {
  if (polygons1.length === polygons2.length) {
    return polygons1.reduce((valid, polygon, index) => (valid && comparePolygon(polygons1[index], polygons2[index])), true)
  }
  return false
}

module.exports = comparePolygons
