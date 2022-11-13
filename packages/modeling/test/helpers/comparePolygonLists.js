import comparePolygons from './comparePolygons.js'

export const comparePolygonLists = (polygons1, polygons2) => {
  if (polygons1.length === polygons2.length) {
    return polygons1.reduce((valid, polygon, index) => (valid && comparePolygons(polygons1[index], polygons2[index])), true)
  }
  return false
}
export default comparePolygonLists
