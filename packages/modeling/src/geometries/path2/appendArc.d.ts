import type { Path2 } from './type.d.ts'
import type { Vec2 } from '../../maths/vec2/type.d.ts'

export interface AppendArcOptions {
  endpoint: Vec2
  radius?: Vec2
  xaxisRotation?: number
  clockwise?: boolean
  large?: boolean
  segments?: number
}

export function appendArc(options: AppendArcOptions, geometry: Path2): Path2
