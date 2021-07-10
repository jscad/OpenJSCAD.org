import Vec2 from '../../maths/vec2/type'
import Mat4 from '../../maths/mat4/type'
import { Colored } from '../types'

export default Geom2

declare interface Geom2 extends Colored {
  sides: Array<[Vec2, Vec2]>
  transforms: Mat4
}
