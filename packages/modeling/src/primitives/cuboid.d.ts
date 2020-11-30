import Vec3 from '../maths/vec3/type'
import Geom3 from '../geometries/geom3/type'

export default cuboid

export interface CuboidOptions {
  center?: Vec3
  size?: Vec3
}

declare function cuboid(options?: CuboidOptions): Geom3
