import Vec2 from '../maths/vec2/type'
import Path2 from '../geometries/path2/type'

export interface ArcOptions {
  center?: Vec2
  radius?: number
  startAngle?: number
  endAngle?: number
  segments?: number
  makeTangent?: boolean
}

export function arc(options?: ArcOptions): Path2
