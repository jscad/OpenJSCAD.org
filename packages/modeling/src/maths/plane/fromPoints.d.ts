import type { Plane } from './type.d.ts'
import type { Vec3 } from '../vec3/type.d.ts'

export function fromPoints(out: Plane, ...vertices: Array<Vec3>): Plane
