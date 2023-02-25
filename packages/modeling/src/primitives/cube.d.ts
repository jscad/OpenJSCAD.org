import { Vec3 } from '../maths/vec3/type'
import { Geom3 } from '../geometries/geom3/type'

export interface CubeOptions {
  center?: Vec3
  size?: number
}

export function cube(options?: CubeOptions): Geom3
