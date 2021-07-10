import Vec2 from '../../maths/vec2/type'
import Mat4 from '../../maths/mat4/type'
import { Colored } from '../types'

export default Path2

declare interface Path2 extends Colored {
  points: Array<Vec2>
  isClosed: boolean
  transforms: Mat4
}
