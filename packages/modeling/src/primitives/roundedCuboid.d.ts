import Vec3 from '../maths/vec3/type'
import Geom3 from '../geometries/geom3/type'

export default roundedCuboid

export interface RoundedCuboidOptions {
  center?: Vec3
  size?: Vec3
  roundRadius?: number
  segments?: number
}

declare function roundedCuboid(options?: RoundedCuboidOptions): Geom3
