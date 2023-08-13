import type { Mat4 } from './type.d.ts'
import type { Vec3 } from '../vec3/type.d.ts'

export function fromRotation(out: Mat4, rad: number, axis: Vec3): Mat4
