import type { Vec2 } from '../maths/vec2/type.d.ts'
import type { Geom2 } from '../geometries/geom2/type.d.ts'

export interface StarOptions {
  center?: Vec2
  vertices?: number
  density?: number
  outerRadius?: number
  innerRadius?: number
  startAngle?: number
}

export function star(options?: StarOptions): Geom2
