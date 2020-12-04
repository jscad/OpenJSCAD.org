import Vec3 from '../maths/vec3/type'
import Geom3 from '../geometries/geom3/type'

export default sphere

export interface SphereOptions {
  center?: Vec3
  radius?: number
  segments?: number
  axes?: Vec3
}

declare function sphere(options?: SphereOptions): Geom3
