import type { Vec2 } from '../maths/vec2/type.d.ts'
import type { Geom2 } from '../geometries/geom2/type.d.ts'

export interface CircleOptions {
  center?: Vec2
  radius?: number
  startAngle?: number
  endAngle?: number
  segments?: number
}

export function circle(options?: CircleOptions): Geom2
