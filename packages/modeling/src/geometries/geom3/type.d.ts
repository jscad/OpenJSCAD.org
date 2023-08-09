import type { Poly3 } from '../poly3/type.d.ts'
import type { Mat4 } from '../../maths/mat4/type.d.ts'
import type { Color } from '../types.d.ts'

export interface Geom3 {
  polygons: Array<Poly3>
  transforms: Mat4
  color?: Color
}
