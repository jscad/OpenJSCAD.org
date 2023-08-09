import type { Plane } from '../plane/type.d.ts'
import type { Vec2 } from '../vec2/type.d.ts'
import type { Vec3 } from '../vec3/type.d.ts'

export class OrthonormalFormula {
  constructor (plane: Plane)
  to2D (vertex: Vec3): Vec2
  to3D (point: Vec2): Vec3
}
