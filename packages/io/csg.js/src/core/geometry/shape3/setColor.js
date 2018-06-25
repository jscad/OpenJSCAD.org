const setShared = require('./setShared')

/** sets the color of this csg: non mutating, returns a new CSG
 * @param  {Object} args
 * @returns {CSG} a copy of this CSG, with the given color
 */
function setColor (shape3, args) {
  let newshared = Polygon3.Shared.fromColor.apply(this, arguments)
  return setShared(shape3, newshared)
}

module.exports = setColor
