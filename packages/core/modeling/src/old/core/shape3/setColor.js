const setShared = require('./geom3/setShared')

/** sets the color of this csg: non mutating, returns a new CSG
 * @param  {Object} args
 * @returns {CSG} a copy of this CSG, with the given color
 */
const setColor = (shape, args) => {
  let newshared = Polygon3.Shared.fromColor.apply(this, arguments)
  return setShared(shape, newshared)
}

module.exports = setColor
