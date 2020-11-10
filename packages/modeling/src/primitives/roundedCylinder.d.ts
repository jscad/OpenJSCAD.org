import Vec3 from '../maths/vec3/type'
import Geom3 from '../geometries/geom3/type'

export default roundedCylinder

export interface RoundedCylinderOptions {
  center?: Vec3
  height?: number
  radius?: number
  roundRadius?: number
  segments?: number
}

declare function roundedCylinder(options?: RoundedCylinderOptions): Geom3
