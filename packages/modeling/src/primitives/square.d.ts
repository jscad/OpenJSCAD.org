import type { Vec2 } from '../maths/vec2/type.d.ts'
import type { Geom2 } from '../geometries/geom2/type.d.ts'

export interface SquareOptions {
  center?: Vec2
  size?: number
}

export function square(options?: SquareOptions): Geom2
