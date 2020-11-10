import Vec2 from '../maths/vec2/type'
import Geom2 from '../geometries/geom2/type'

export default roundedRectangle

export interface RoundedRectangleOptions {
  center?: Vec2
  size?: Vec2
  roundRadius?: number
  segments?: number
}

declare function roundedRectangle(options?: RoundedRectangleOptions): Geom2
