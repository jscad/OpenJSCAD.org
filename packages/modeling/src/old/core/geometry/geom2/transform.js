const mat4 = require('../../math/mat4')
const vec2 = require('../../math/vec2')
const fromSides = require('./fromSides')
const flip = require('./flip')

/** this actually transforms the individual points/ vertices/ etc
 * so should be called sparselly
 * it should be used whenever boolean operations are applied
 * @typedef  {import('./create').Geom2} Geom2
 * @param {Mat4} matrix
 * @param {Geom2} geometry
 * @returns {Geom2} a new shape, with updated geometry
 */
const transform = (matrix, geometry) => {
  const newsides = geometry.sides.map(side => [
    vec2.transformMat4(matrix, side[0]),
    vec2.transformMat4(matrix, side[1])
  ])
  return mat4.isMirroring(matrix) ? flip(fromSides(newsides)) : fromSides(newsides)
}
module.exports = transform
