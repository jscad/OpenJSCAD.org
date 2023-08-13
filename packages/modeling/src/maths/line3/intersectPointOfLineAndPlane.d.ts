import type { Plane } from '../plane/type.d.ts'
import type { Vec3 } from '../vec3/type.d.ts'
import type { Line3 } from './type.d.ts'

export function intersectPointOfLineAndPlane(line: Line3, plane: Plane): Vec3
