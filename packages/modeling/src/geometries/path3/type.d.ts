import type { Vec3 } from '../../maths/vec3/type.d.ts'
import type { Mat4 } from '../../maths/mat4/type.d.ts'
import type { Color } from '../types.d.ts'

export interface Path3 {
  vertices: Array<Vec3>
  isClosed: boolean
  transforms: Mat4
  color?: Color
}
