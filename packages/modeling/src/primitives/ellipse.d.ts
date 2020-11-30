import Vec2 from '../maths/vec2/type'
import Geom2 from '../geometries/geom2/type'

export default ellipse

export interface EllipseOptions {
  center?: Vec2
  radius?: Vec2
  startAngle?: number
  endAngle?: number
  segments?: number
}

declare function ellipse(options?: EllipseOptions): Geom2
