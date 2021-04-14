import Vec3 from '../maths/vec3/type'
import Geom3 from '../geometries/geom3/type'

export default cylinder

export interface CylinderOptions {
  center?: Vec3
  height?: number
  radius?: number
  segments?: number
}

declare function cylinder(options?: CylinderOptions): Geom3
