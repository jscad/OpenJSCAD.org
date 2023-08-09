import type { Vec3 } from '../maths/vec3/type.d.ts'
import type { Geom3 } from '../geometries/geom3/type.d.ts'

export interface CylinderOptions {
  center?: Vec3
  height?: number
  radius?: number
  segments?: number
}

export function cylinder(options?: CylinderOptions): Geom3
