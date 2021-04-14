import Vec2 from '../maths/vec2/type'
import Geom2 from '../geometries/geom2/type'

export default rectangle

export interface RectangleOptions {
  center?: Vec2
  size?: Vec2
}

declare function rectangle(options?: RectangleOptions): Geom2
