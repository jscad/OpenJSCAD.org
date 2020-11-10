import Vec2 from '../maths/vec2/type'
import Path2 from '../geometries/path2/type'

export default arc

export interface ArcOptions {
  center?: Vec2
  radius?: number
  startAngle?: number
  endAngle?: number
  segments?: number
  makeTangent?: boolean
}

declare function arc(options?: ArcOptions): Path2
