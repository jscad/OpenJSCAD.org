import type { Vec3 } from '../../maths/vec3/type.d.ts'
import type { Color } from '../types.d.ts'

export interface Slice {
  contours: Array<Array<Vec3>>
  color?: Color
}
