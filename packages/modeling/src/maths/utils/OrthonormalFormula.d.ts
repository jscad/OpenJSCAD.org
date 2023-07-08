import { Plane } from '../plane/type'
import { Vec2 } from '../vec2/type'
import { Vec3 } from '../vec3/type'

export class OrthonormalFormula {
  constructor (plane: Plane)
  to2D (vertex: Vec3): Vec2
  to3D (point: Vec2): Vec3
}
