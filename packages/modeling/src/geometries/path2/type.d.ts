import Vec2 from '../../maths/vec2/type'
import Mat4 from '../../maths/mat4/type'

export default Path2

declare interface Path2 {
  points: Array<Vec2>
  isClosed: boolean
  transforms: Mat4
}
