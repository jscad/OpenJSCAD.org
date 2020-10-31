import Vec2 = require('../../maths/vec2/type')
import Mat4 = require('../../maths/mat4/type')

export = Path2

declare interface Path2 {
  points: Array<Vec2>
  isClosed: boolean
  transforms: Mat4
}
