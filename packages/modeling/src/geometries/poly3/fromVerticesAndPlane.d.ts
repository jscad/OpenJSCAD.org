import type { Vec3 } from '../../maths/vec3/type.d.ts'
import type { Plane } from '../../maths/plane/type.d.ts'
import type { Poly3 } from './type.d.ts'

export function fromVerticesAndPlane(vertices: Array<Vec3>, plane: Plane): Poly3
