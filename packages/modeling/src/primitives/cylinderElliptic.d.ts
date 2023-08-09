import type { Vec3 } from '../maths/vec3/type.d.ts'
import type { Geom3 } from '../geometries/geom3/type.d.ts'

export interface CylinderEllipticOptions {
  center?: Vec3
  height?: number
  startRadius?: [number, number]
  startAngle?: number
  endRadius?: [number, number]
  endAngle?: number
  segments?: number
}

export function cylinderElliptic(options?: CylinderEllipticOptions): Geom3
