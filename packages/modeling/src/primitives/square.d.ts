import { Vec2 } from '../maths/vec2/type'
import { Geom2 } from '../geometries/geom2/type'

export interface SquareOptions {
  center?: Vec2
  size?: number
}

export function square(options?: SquareOptions): Geom2
