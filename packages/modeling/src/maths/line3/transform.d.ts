import type { Line3 } from './type.d.ts'
import type { Mat4 } from '../mat4/type.d.ts'

export function transform(out: Line3, line: Line3, matrix: Mat4): Line3
