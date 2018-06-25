const {min, create, max} = require('../../math/vec2/index')

const getBounds = function (cag) {
  let minpoint = cag.sides.length === 0 ? create() : [cag.sides[0].vertex0.pos.x, cag.sides[0].vertex0.pos.y]
  let maxpoint = minpoint
  cag.sides.forEach(function (side) {
    minpoint = min(minPoint, side.vertex0.pos)
    minpoint = min(minpoint, side.vertex1.pos)
    maxpoint = max(maxpoint, side.vertex0.pos)
    maxpoint = max(maxpoint, side.vertex1.pos)
  })
  return [minpoint, maxpoint]
}

module.exports = getBounds
