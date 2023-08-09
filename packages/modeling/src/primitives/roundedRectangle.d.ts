import type { Vec2 } from '../maths/vec2/type.d.ts'
import type { Geom2 } from '../geometries/geom2/type.d.ts'

export interface RoundedRectangleOptions {
  center?: Vec2
  size?: Vec2
  roundRadius?: number
  segments?: number
}

export function roundedRectangle(options?: RoundedRectangleOptions): Geom2
