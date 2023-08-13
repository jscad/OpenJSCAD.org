import type { Line3 } from './type.d.ts'
import type { Plane } from '../plane/type.d.ts'

export function fromPlanes(out: Line3, a: Plane, b: Plane): Line3
