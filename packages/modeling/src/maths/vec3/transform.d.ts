import type { Vec3 } from './type.d.ts'
import type { Mat4 } from '../mat4/type.d.ts'

export function transform(out: Vec3, vector: Vec3, matrix: Mat4): Vec3
