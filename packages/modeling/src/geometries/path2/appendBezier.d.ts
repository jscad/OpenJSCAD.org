import Path2 from './type'
import Vec2 from '../../maths/vec2/type'

export interface AppendBezierOptions {
  controlPoints: Array<Vec2 | null>
  segments?: number
}

export function appendBezier(options: AppendBezierOptions, geometry: Path2): Path2
