import Vec2 from '../../maths/vec2/type'
import Mat4 from '../../maths/mat4/type'

export interface Geom2 {
  sides: Array<[Vec2, Vec2]>
  transforms?: Mat4
}

export default Geom2
