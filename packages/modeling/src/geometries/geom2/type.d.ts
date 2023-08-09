import type { Vec2 } from '../../maths/vec2/type.d.ts'
import type { Mat4 } from '../../maths/mat4/type.d.ts'
import type { Color } from '../types.d.ts'

export interface Geom2 {
  outlines: Array<Array<Vec2>>
  transforms: Mat4
  color?: Color
}
