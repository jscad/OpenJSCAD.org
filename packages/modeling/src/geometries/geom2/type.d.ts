import { Vec2 } from '../../maths/vec2/type'
import { Mat4 } from '../../maths/mat4/type'
import { Color } from '../types'

export interface Geom2 {
  outlines: Array<Array<Vec2>>
  transforms: Mat4
  color?: Color
}
