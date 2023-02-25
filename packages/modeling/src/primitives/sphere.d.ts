import { Vec3 } from '../maths/vec3/type'
import { Geom3 } from '../geometries/geom3/type'

export interface SphereOptions {
  center?: Vec3
  radius?: number
  segments?: number
  axes?: Vec3
}

export function sphere(options?: SphereOptions): Geom3
