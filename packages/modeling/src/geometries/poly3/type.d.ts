import type { Plane } from '../../maths/plane/type.d.ts'
import type { Vec3 } from '../../maths/vec3/type.d.ts'
import type { Color } from '../types.d.ts'

export interface Poly3 {
  vertices: Array<Vec3>
  color?: Color

  // used internally for calculations
  plane?: Plane
}
