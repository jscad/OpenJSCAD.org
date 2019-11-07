
/** determine if two geometries are equal
 * @typedef  {import('./create').Geom2} Geom2
 * @param  {Geom2} geom
 * @param  {Geom2} otherGeom
 */
const equals = (geom, otherGeom) => {
  if (geom.isCanonicalized !== otherGeom.isCanonicalized) {
    return false // FIXME: does this make sense ??
  }
  for (let i = 0; i < geom.sides.length; i++) {
    for (let j = 0; j < 4; j++) {
      if (geom[i][j] !== otherGeom[i][j]) {
        return false
      }
    }
  }
}

module.exports = equals
