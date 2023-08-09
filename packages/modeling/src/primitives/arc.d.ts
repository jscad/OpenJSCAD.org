import type { Vec2 } from '../maths/vec2/type.d.ts'
import type { Path2 } from '../geometries/path2/type.d.ts'

export interface ArcOptions {
  center?: Vec2
  radius?: number
  startAngle?: number
  endAngle?: number
  segments?: number
  makeTangent?: boolean
}

export function arc(options?: ArcOptions): Path2
