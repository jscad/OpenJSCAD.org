import Vec2 = require('../../maths/vec2/type')
import Mat4 = require('../../maths/mat4/type')

export = Geom2

declare interface Geom2 {
  sides: Array<[Vec2, Vec2]>
  transforms: Mat4
}
