import type { Vec2 } from '../maths/vec2/type.d.ts'
import type { Geom2 } from '../geometries/geom2/type.d.ts'

export interface RectangleOptions {
  center?: Vec2
  size?: Vec2
}

export function rectangle(options?: RectangleOptions): Geom2
