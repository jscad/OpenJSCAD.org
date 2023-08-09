import type { Vec2 } from '../maths/vec2/type.d.ts'
import type { Geom2 } from '../geometries/geom2/type.d.ts'

export interface EllipseOptions {
  center?: Vec2
  radius?: Vec2
  startAngle?: number
  endAngle?: number
  segments?: number
}

export function ellipse(options?: EllipseOptions): Geom2
