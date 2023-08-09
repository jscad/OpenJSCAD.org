import type { Vec3 } from '../maths/vec3/type.d.ts'
import type { Geom3 } from '../geometries/geom3/type.d.ts'

export interface RoundedCuboidOptions {
  center?: Vec3
  size?: Vec3
  roundRadius?: number
  segments?: number
}

export function roundedCuboid(options?: RoundedCuboidOptions): Geom3
