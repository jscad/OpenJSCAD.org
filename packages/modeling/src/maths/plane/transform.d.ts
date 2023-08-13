import type { Plane } from './type.d.ts'
import type { Mat4 } from '../mat4/type.d.ts'

export function transform(out: Plane, plane: Plane, matrix: Mat4): Plane
