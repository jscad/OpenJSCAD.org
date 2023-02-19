import Vec2 from '../../maths/vec2/type'
import Mat4 from '../../maths/mat4/type'
import { Color } from '../types'

declare interface Path2 {
  points: Array<Vec2>
  isClosed: boolean
  transforms: Mat4
  color?: Color
}
