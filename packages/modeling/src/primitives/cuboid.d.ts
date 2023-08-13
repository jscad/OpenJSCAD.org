import type { Vec3 } from '../maths/vec3/type.d.ts'
import type { Geom3 } from '../geometries/geom3/type.d.ts'

export interface CuboidOptions {
  center?: Vec3
  size?: Vec3
}

export function cuboid(options?: CuboidOptions): Geom3
