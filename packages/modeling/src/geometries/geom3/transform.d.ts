import type { Geom3 } from './type.d.ts'
import type { Mat4 } from '../../maths/mat4/type.d.ts'

export function transform(matrix: Mat4, geometry: Geom3): Geom3
