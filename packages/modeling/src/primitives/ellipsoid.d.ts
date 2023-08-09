import type { Vec3 } from '../maths/vec3/type.d.ts'
import type { Geom3 } from '../geometries/geom3/type.d.ts'

export interface EllipsoidOptions {
  center?: Vec3
  radius?: Vec3
  segments?: number
  axes?: Vec3
}

export function ellipsoid(options?: EllipsoidOptions): Geom3
