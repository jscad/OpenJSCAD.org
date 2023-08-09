import type { Path2 } from './type.d.ts'
import type { Vec2 } from '../../maths/vec2/type.d.ts'

export interface AppendBezierOptions {
  controlPoints: Array<Vec2 | null>
  segments?: number
}

export function appendBezier(options: AppendBezierOptions, geometry: Path2): Path2
