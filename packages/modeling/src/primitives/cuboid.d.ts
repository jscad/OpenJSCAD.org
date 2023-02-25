import { Vec3 } from '../maths/vec3/type'
import { Geom3 } from '../geometries/geom3/type'

export interface CuboidOptions {
  center?: Vec3
  size?: Vec3
}

export function cuboid(options?: CuboidOptions): Geom3
