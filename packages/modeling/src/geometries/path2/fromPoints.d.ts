import type { Path2 } from './type.d.ts'
import type { Vec2 } from '../../maths/vec2/type.d.ts'

export interface FromPointsOptions {
  closed?: boolean
}

export function fromPoints(options: FromPointsOptions, points: Array<Vec2>): Path2
