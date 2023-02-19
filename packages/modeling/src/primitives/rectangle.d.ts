import Vec2 from '../maths/vec2/type'
import Geom2 from '../geometries/geom2/type'

export interface RectangleOptions {
  center?: Vec2
  size?: Vec2
}

export function rectangle(options?: RectangleOptions): Geom2
