import Vec3 from '../maths/vec3/type'
import Geom3 from '../geometries/geom3/type'

export interface EllipsoidOptions {
  center?: Vec3
  radius?: Vec3
  segments?: number
  axes?: Vec3
}

export function ellipsoid(options?: EllipsoidOptions): Geom3
