const { min, create, max } = require('../../math/vec2')

/** get the bounds of the input 2d geometry
 * @param {Geom2} geometry the geometry to measure
 * @return {Array} array of points representing the bounding cube: [minPoint, maxPoint]
 * @example:
 * const bounds = measureBounds(rectangle())
 */
const measureBounds = geometry => {
  let minPoint = geometry.sides.length === 0 ? create() : [geometry.sides[0][0][0], geometry.sides[0][0][1]]
  let maxPoint = minPoint
  geometry.sides.forEach(side => {
    minPoint = min(minPoint, side[0])
    minPoint = min(minPoint, side[1])
    maxPoint = max(maxPoint, side[0])
    maxPoint = max(maxPoint, side[1])
  })
  return [minPoint, maxPoint]
}

module.exports = measureBounds
