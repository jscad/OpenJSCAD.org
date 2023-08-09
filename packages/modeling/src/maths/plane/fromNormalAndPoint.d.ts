import type { Plane } from './type.d.ts'
import type { Vec3 } from '../vec3/type.d.ts'

export function fromNormalAndPoint(out: Plane, normal: Vec3, point: Vec3): Plane
