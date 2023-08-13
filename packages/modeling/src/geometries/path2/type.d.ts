import type { Vec2 } from '../../maths/vec2/type.d.ts'
import type { Mat4 } from '../../maths/mat4/type.d.ts'
import type { Color } from '../types.d.ts'

export interface Path2 {
  points: Array<Vec2>
  isClosed: boolean
  transforms: Mat4
  color?: Color
}
