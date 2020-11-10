import Vec3 from '../maths/vec3/type'
import Geom3 from '../geometries/geom3/type'

export default ellipsoid

export interface EllipsoidOptions {
  center?: Vec3
  radius?: Vec3
  segments?: number
  axes?: Vec3
}

declare function ellipsoid(options?: EllipsoidOptions): Geom3
