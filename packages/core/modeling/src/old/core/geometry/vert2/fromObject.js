const vec2 = require('../../math/vec2')
const fromVec2 = require('./fromVec2')

// FIXME: never used anywhere ??
const fromObject = obj => {
  return fromVec2(vec2.fromValues(obj.pos.x, obj.pos.y))
  // vec2(obj.pos._x, obj.pos._y))
}

module.exports = fromObject
