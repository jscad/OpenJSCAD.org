import type { Geom2 } from './type.d.ts'
import type { Mat4 } from '../../maths/mat4/type.d.ts'

export function transform(matrix: Mat4, geometry: Geom2): Geom2
