import type { Vec3 } from '../maths/vec3/type.d.ts'
import type { Geom3 } from '../geometries/geom3/type.d.ts'

export interface CubeOptions {
  center?: Vec3
  size?: number
}

export function cube(options?: CubeOptions): Geom3
