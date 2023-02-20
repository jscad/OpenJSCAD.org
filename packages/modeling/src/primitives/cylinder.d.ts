import { Vec3 } from '../maths/vec3/type'
import { Geom3 } from '../geometries/geom3/type'

export interface CylinderOptions {
  center?: Vec3
  height?: number
  radius?: number
  segments?: number
}

export function cylinder(options?: CylinderOptions): Geom3
